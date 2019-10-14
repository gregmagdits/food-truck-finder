import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageTransition from "react-router-page-transition";

import FoodTruckList from "./components/food-truck-list/food-truck-list";
import FoodTruckDetail from "./components/food-truck-detail/food-truck-detail";
import './page-slide-transition.css';
import FoodTruckListItem from "./components/food-truck-list/food-truck-list-item/food-truck-list-item";
import config from "./config"

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
          error: null,
          isLoaded: false,
          foodTrucks: []
      };
  }
  componentDidMount() {
      //https://reactjs.org/docs/faq-ajax.html
    fetch(`${config.api_base}/`)
        .then(res => {
            return res.json();
        })
        .then((data) => {
            console.log(`response was ${JSON.stringify(data)}`)
            this.setState({ foodTrucks: data.body, isLoaded: true })
        })
        .catch((error) =>{
            this.setState({ error: error, isLoaded: true })
        })
  }

  render() {
    const ListRenderFunc = (props) => {
        console.log(this.state.foodTruckArray);
        return (
          <FoodTruckList {...props} foodTruckArray={this.state.foodTrucks} history={props.history}/>
        );
    }
    const TruckRenderFunc = (props) => {
        let selectedTruck = this.foodTruckArray.find(truck => {
            let part = props.match.params.foodTruckName;
            return part == truck.name;
        });
        console.log(`selected truck is ${JSON.stringify(selectedTruck)}`)
        return (
          <FoodTruckDetail {...props} history={props.history} truck={selectedTruck}/>
        );
    }
    return (
      <Router >
        <Route
          render={({ location }) => (
            <PageTransition timeout={500}>
              <Switch location={location}>
                  <Route exact path="/" render={ListRenderFunc}/>
                  <Route path="/food-trucks/:foodTruckName" render={TruckRenderFunc} />
              </Switch>
            </PageTransition>
          )}
        />
      </Router>
    );
  }
}

export default App;

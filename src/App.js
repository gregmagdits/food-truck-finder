import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageTransition from "react-router-page-transition";

import FoodTruckList from "./components/food-truck-list/food-truck-list";
import FoodTruckDetail from "./components/food-truck-detail/food-truck-detail";
import './css/main.scss';
import FoodTruckService from "./services/FoodTruckService";
import FoodTruckReviews from "./components/food-truck-reviews/food-truck-reviews";

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
          error: null,
          isLoaded: false,
          foodTrucks: []
      };
      this.service = new FoodTruckService();
  }
  componentDidMount() {
      //https://reactjs.org/docs/faq-ajax.html
      this.service.getAllFoodTrucks().then((data) => {
            console.log(`response was ${JSON.stringify(data)}`)
            this.setState({ foodTrucks: data, isLoaded: true })
        })
        .catch((error) =>{
            this.setState({ error: error, isLoaded: true })
        })
  }

  render() {
    const ListRenderFunc = (props) => {
        console.log(this.state.foodTruckArray);
        if (!this.state.isLoaded) {
            console.log('rendering null')
            return (<div></div>);
        }
        return (
          <FoodTruckList {...props} foodTruckArray={this.state.foodTrucks} history={props.history}/>
        );
    }
    const TruckRenderFunc = (props) => {
        let selectedTruck = this.state.foodTrucks.find(truck => {
            let part = props.match.params.foodTruckName;
            return part === truck.name;
        });
        console.log(`selected truck is: `, selectedTruck)
        return (
          <FoodTruckDetail {...props} history={props.history} foodTruck={selectedTruck}/>
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

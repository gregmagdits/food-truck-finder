import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageTransition from "react-router-page-transition";

import FoodTruckList from "./components/food-truck-list/food-truck-list";
import FoodTruckDetail from "./components/food-truck-detail/food-truck-detail";
import './page-slide-transition.css';
import config from "./config"

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
          error: null,
          isLoaded: false,
          foodTrucks: []
      };
      this.abortController = new AbortController();

  }
    componentDidMount() {
      console.log('mount');
      //https://reactjs.org/docs/faq-ajax.html
    fetch(`${config.api_base}/`, {signal:this.abortController.signal})
        .then(res => {
            return res.json();
        })
        .then((data) => {
            console.log('data: ',data)
            this.setState({ foodTrucks: data, isLoaded: true })

        })
        .catch((error) =>{
            this.setState({ error: error, isLoaded: true })
        })
  }

  componentWillUnmount() {
      console.log('unmounting')
      this.abortController.abort();
  }

  render() {
      let trucks = this.state.foodTrucks;
    const ListRenderFunc = (props) => {
        console.log('running render');
        if (!this.state.isLoaded){
            console.log('rendering null')
            return ( <div></div> ) ;
        }else{
            console.log('rendering food truck list')
            console.log('state: ',this.state);
            console.log('props: ', props);
            console.log('trucks: ',trucks)
            return (
                <FoodTruckList {...props} foodTruckArray={trucks} history={props.history}/>
            );
        }
    }
    const TruckRenderFunc = (props) => {
        let selectedTruck = this.state.foodTrucks.find(truck => {
            let part = props.match.params.foodTruckName;
            return part === truck.name;
        });
        console.log('selected truck is :', selectedTruck)
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

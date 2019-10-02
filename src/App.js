import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageTransition from "react-router-page-transition";

import FoodTruckList from "./components/food-truck-list/food-truck-list";
import FoodTruckDetail from "./components/food-truck-detail/food-truck-detail";
import './page-slide-transition.css';
import FoodTruckListItem from "./components/food-truck-list/food-truck-list-item/food-truck-list-item";

class App extends Component {
  constructor(props) {
    super(props);

    // get from api call
    this.foodTruckArray = [{name:"Snake Hill",description:"sausages",image:"snake-hill.jpg","distance" :.1},
          {name:"Kommie Pig",description:"BBQ by commies",image:"kommie-pig.jpg","distance" :.2},
          {name:"Mexican on The Run",description:"Mexican food",image:"mexican-on-the-run.jpg","distance" :.3}];

    //this.state = {};

  }

  render() {
    const ListRenderFunc = (props) => {
        console.log(props);
        return (
          <FoodTruckList {...props} foodTruckArray={this.foodTruckArray} history={props.history}/>
        );
    }
    const TruckRenderFunc = (props) => {
        console.log(props)
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
{/*                  <Route exact path="/"  >
                      <FoodTruckList foodTruckArray={this.foodTruckArray} history={this.props.history}/>
                  </Route>*/}
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

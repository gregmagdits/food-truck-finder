import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageTransition from "react-router-page-transition";

import FoodTruckList from "./components/food-truck-list/food-truck-list";
import FoodTruckDetail from "./components/food-truck-detail/food-truck-detail";
import './page-slide-transition.css';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  render() {
    return (
      <Router>
        <Route
          render={({ location }) => (
            <PageTransition timeout={500}>
              <Switch location={location}>
                <Route exact path="/" component={FoodTruckList} />
                {/* <Route path="/list" component={List}/> */}
                <Route path="/item" component={FoodTruckDetail} />
              </Switch>
            </PageTransition>
          )}
        />
      </Router>
    );
  }
}

export default App;

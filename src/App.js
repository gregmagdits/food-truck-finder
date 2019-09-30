import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageTransition from "react-router-page-transition";

import List from "./list";
import Item from "./item";

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
                <Route exact path="/" component={List} />
                {/* <Route path="/list" component={List}/> */}
                <Route path="/item" component={Item} />
              </Switch>
            </PageTransition>
          )}
        />
      </Router>
    );
  }
}

export default App;

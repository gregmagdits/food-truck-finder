import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageTransition from "react-router-page-transition";

import FoodTruckList from "./components/food-truck-list/food-truck-list";
import FoodTruckDetail from "./components/food-truck-detail/food-truck-detail";
import '../css/main.scss';
import FoodTruckService from "./services/FoodTruckService";
import FoodTruckReviews from "./components/food-truck-reviews/food-truck-reviews";
import FoodItemReviews from "./components/food-truck-detail/food-truck-food-item/food-item-reviews/food-item-reviews";
import Callback from "./components/callback/callback"

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
            console.log("response was :", data)
            this.setState({ foodTrucks: data, isLoaded: true })
        })
        .catch((error) =>{
            this.setState({ error: error, isLoaded: true })
        })
  }

  getSelectedTruck(props){
      return this.state.foodTrucks.find(truck => {
          let part = props.match.params.foodTruckName;
          return part === truck.name;
      });
  }

  getSelectedFoodItem(props){
      let selectedTruck = this.getSelectedTruck(props);
      let part = props.match.params.foodItemId;
      console.log("selected truck in reviews: ", selectedTruck);
      console.log("part is :", part)
      return selectedTruck.foodItems.find(item => {
            return part == item.id;
        });
    }

  TruckReviewRenderFunc(props){
      let selectedTruck = this.getSelectedTruck(props);
      console.log(`selected truck is: `, selectedTruck)
      return (
          <FoodTruckReviews {...props} history={props.history} foodTruck={selectedTruck}/>
      );
  }

    TruckRenderFunc(props){
        let selectedTruck = this.getSelectedTruck(props);
        console.log(`selected truck is: `, selectedTruck)
        return (
            <FoodTruckDetail {...props} history={props.history} foodTruck={selectedTruck}/>
        );
    }
    ListRenderFunc(props){
        console.log(this.state.foodTruckArray);
        if (!this.state.isLoaded) {
            console.log('rendering null')
            return (<div></div>);
        }
        return (
            <FoodTruckList {...props} foodTruckArray={this.state.foodTrucks} history={props.history}/>
        );
    }
    FoodItemReviewRenderFunc(props){
        if (!this.state.isLoaded) {
            return (<div>Loading...</div>);
        }
        let selectedFoodItem = this.getSelectedFoodItem(props);
        console.log("selected food item: ", selectedFoodItem);
        let selectedFoodTruck = this.getSelectedTruck(props);
        return (
            <FoodItemReviews {...props} foodTruck={selectedFoodTruck} foodItem={selectedFoodItem} history={props.history}/>
        );

    }
  render() {

      let _me = this;
    return (
      <Router >
        <Route
          render={({ location }) => (
            <PageTransition timeout={500}>
              <Switch location={location}>
                  <Route exact path="/" render={_me.ListRenderFunc.bind(_me)}/>
                  <Route  path="/food-trucks/:foodTruckName/food/:foodItemId/reviews" render={_me.FoodItemReviewRenderFunc.bind(_me)} />
                  <Route  path="/food-trucks/:foodTruckName/reviews" render={_me.TruckReviewRenderFunc.bind(_me)} />
                  <Route  path="/food-trucks/:foodTruckName" render={_me.TruckRenderFunc.bind(_me)} />
                  <Route exact path="/callback" component={Callback}/>
              </Switch>
            </PageTransition>
          )}
        />
      </Router>
    );
  }
}

export default App;

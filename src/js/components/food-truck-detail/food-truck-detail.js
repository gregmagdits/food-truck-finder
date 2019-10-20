import React, { Component } from "react";
import FoodTruckFoodItem from "./food-truck-food-item/food-truck-food-item";
import "./food-truck-detail.scss"

class FoodTruckDetail extends Component {

  constructor(props){
    super(props)
    console.log('foodtruckdetail const: ',props)
    this.state = {
      foodTruck: props.foodTruck,
      isLoaded : props.foodTruck ? true : false,
      history: props.history
    }
  }

  render() {
    if (!this.state.foodTruck){
      console.log('Loading ')
      return <div className="transition-item detail-page">Loading...</div>;
    }
    let foodItems = this.state.foodTruck.foodItems.map(item =>{
      return (   <FoodTruckFoodItem item={item} history={this.state.history} match={this.props.match}/>   );
    })
    return (
      <div className="transition-item detail-page">
        <div onClick={this.goBack.bind(this)}>
          <p style={{ padding: 10 }}>
            {this.state.foodTruck.name}
          </p>
        </div>
        <div>
          {this.state.foodTruck.description}
        </div>
        <div className="food-items-container">
          {foodItems}
        </div>

      </div>
    );
  }

  goBack(e) {
    e.preventDefault();
    this.props.history.goBack();
  }
}

export default FoodTruckDetail;

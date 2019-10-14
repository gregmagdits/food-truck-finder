import React, { Component } from "react";
import * as ReactDOM from "react-dom";

class FoodTruckDetail extends Component {

  constructor(props){
    super(props)
    console.log('foodtruckdetail const: ',props)
    this.state = {
      foodTruck: props.foodTruck,
      isLoaded : props.foodTruck ? true : false
    }
  }

  render() {
    if (!this.state.foodTruck){
      console.log('Loading ')
      return <div className="transition-item detail-page">Loading...</div>;
    }
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
      </div>
    );
  }

  goBack() {
    this.props.history.goBack();
  }
}

export default FoodTruckDetail;

import React, { Component } from "react";
import * as ReactDOM from "react-dom";

class FoodTruckDetail extends Component {

  constructor(props){
    super(props)
  }

  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className="transition-item detail-page">
        <div onClick={this.goBack.bind(this)}>
          <p style={{ padding: 10 }}>
            {this.props.truck.name} is fucking great!
          </p>
        </div>
      </div>
    );
  }

  goBack() {
    this.props.history.goBack();
  }
}

export default FoodTruckDetail;

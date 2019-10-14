import React, { Component } from "react";

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
            {this.props.truck.name}
            {this.props.truck.description}
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

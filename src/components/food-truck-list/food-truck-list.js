import React, { Component } from "react";
import GoogleMapReact from "google-map-react"
import "./google-map.scss"
import  "./food-truck-list.scss"
import {secrets} from "../../secrets"
import FoodTruckListItem from "./food-truck-list-item/food-truck-list-item";

class FoodTruckList extends Component {

  constructor(props){
    super(props);
    this.defaultMapProps = {
      center: {
        lat: 39.286820,
        lng: -76.570290
      },
      zoom: 17
    };
    console.log(props);
  }

  shouldComponentUpdate() {
    return false;
  }
  render() {
    let listItems = this.props.foodTruckArray.map((truck, index) => {
      return (<FoodTruckListItem index={index} foodTruck={truck} history={this.props.history}></FoodTruckListItem>)
    });

    return (
        <div className="transition-item list-page">
          <div className={"map-container"}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: secrets.google.maps_api_key }}
                defaultCenter={this.defaultMapProps.center}
                defaultZoom={this.defaultMapProps.zoom}
            >
            </GoogleMapReact>
          </div>
          <div className={"list-group"}>
            {listItems}
          </div>
        </div>
    );
  }


}

export default FoodTruckList;

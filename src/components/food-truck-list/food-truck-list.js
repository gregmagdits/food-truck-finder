import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import randomColor from "randomcolor";
import GoogleMapReact from "google-map-react"
import "./google-map.scss"
import  "./food-truck-list.scss"
import {secrets} from "../../secrets"
import FoodTruckListItem from "./food-truck-list-item/food-truck-list-item";

class FoodTruckList extends Component {

  shouldComponentUpdate() {
    return false;
  }
  render() {

    {/*<img src={images['doggy.png']} />*/}

    let defaultProps = {
      center: {
        lat: 39.286820,
        lng: -76.570290
      },
      zoom: 17
    };

    console.log("render list");
    let foodTruckArray = [{name:"Snake Hill",description:"sausages",image:"snake-hill.jpg","distance" :.1},
      {name:"Kommie Pig",description:"BBQ by commies",image:"kommie-pig.jpg","distance" :.2},
      {name:"Mexican on The Run",description:"Mexican food",image:"mexican-on-the-run.jpg","distance" :.3}];


    let listItems = foodTruckArray.map((truck, index) => {
      return (<FoodTruckListItem index={index} foodTruck={truck} history={this.props.history}></FoodTruckListItem>)
    });


    return <div className="transition-item list-page">
      <div className={"map-container"}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: secrets.google.maps_api_key }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
        </GoogleMapReact>
      </div>
      <div className={"list-group"}>

        {listItems}
      </div>

    </div>;
  }


}

export default FoodTruckList;

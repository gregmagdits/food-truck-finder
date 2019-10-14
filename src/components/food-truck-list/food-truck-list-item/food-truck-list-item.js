import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import randomColor from "randomcolor";
import GoogleMapReact from "google-map-react"
import "../google-map.scss"
import  "../food-truck-list.scss"
import {secrets} from "../../../secrets"

class FoodTruckListItem extends Component {


    constructor(props){
        super(props);
    }

    render() {

        return (
            <div
                key={this.props.index}
                onClick={this.goToItem.bind(this)}
                className={"list-group-item list-group-item-action"}
            >
                <img src={this.props.foodTruck.photo} className="food-truck-img rounded-circle" alt={this.props.foodTruck.name}/>{this.props.foodTruck.name}{/*<small>{this.props.foodTruck.distance} miles</small>*/}
            </div>
        );

    }
    goToItem() {
        this.props.history.push({
            pathname: `/food-trucks/${this.props.foodTruck.name}`
        });
    }
}

export default FoodTruckListItem;
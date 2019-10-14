import React, { Component } from "react";
import "../google-map.scss"
import  "../food-truck-list.scss"

class FoodTruckListItem extends Component {


    constructor(props){
        super(props);
        this.images = _importAll(require.context('../../../img', false, /\.(png|jpe?g|svg)$/));

        function _importAll(r) {
            let images = {};
            r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item); });
            return images;
        }
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
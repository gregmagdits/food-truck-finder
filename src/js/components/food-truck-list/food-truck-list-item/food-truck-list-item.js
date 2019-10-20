import React, { Component } from "react";
import "../google-map.scss"
import  "../food-truck-list.scss"

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
                <img src={this.props.foodTruck.photo} className="food-truck-img rounded-circle" alt={this.props.foodTruck.name}/>
                {this.props.foodTruck.name}
                <button onClick={this.goToReview.bind(this)}>reviews</button>
            </div>
        );
    }
    goToItem(evt) {
        console.log("going to truck detail page")
        evt.preventDefault();
        evt.stopPropagation();
        this.props.history.push({
            pathname: `/food-trucks/${this.props.foodTruck.name}`
        });
    }

    goToReview(evt){
        console.log("going to review page")
        evt.preventDefault();
        evt.stopPropagation();
        this.props.history.push({
            pathname: `/food-trucks/${this.props.foodTruck.name}/reviews`
        });
    }
}

export default FoodTruckListItem;
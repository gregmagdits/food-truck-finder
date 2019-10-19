import React, { Component } from "react";
import "./food-truck-food-item.scss"

class FoodTruckFoodItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            item : props.item,
            history: props.history,
            match: props.match
        }
        console.log("item: ", this.state.item)
    }

    render(){
        if (!this.state.item){
            return <div/>
        }

        let button = null;
        if (this.state.item.canLike){
            button = ( "like this");
        }
        let reviewLink = (
            <button onClick={this.goToReview.bind(this)}></button>
        );
        return (
            <div>
                {this.state.item.name} | {this.state.item.description} | {this.state.item.price} | {this.state.item.numberLikes} | {button} | {reviewLink}
            </div>
        );
    }
    goToReview(evt){
        console.log("going to review page for food item")
        evt.preventDefault();
        evt.stopPropagation();
        let truckName = this.props.match.params.foodTruckName;

        this.props.history.push({
            pathname: `/food-trucks/${truckName}/food/${this.state.item.id}/reviews`
        });
    }
}

export default FoodTruckFoodItem;
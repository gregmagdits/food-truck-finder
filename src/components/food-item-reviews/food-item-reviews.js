import React, { Component } from "react";
import FoodTruckFoodItem from "../food-truck-food-item/food-truck-food-item";
import "./food-item-reviews"

class FoodItemReviews extends Component {
    constructor(props){
        super(props)
        console.log('food-item const: ',props)
        this.state = {
            foodItem: props.foodItem,
            isLoaded : props.foodItem ? true : false,
            foodTruck: props.foodTruck
        }
    }
    render() {
        if (!this.state.foodItem){
            console.log('Loading ')
            return <div className="transition-item food-item-review-page">Loading...</div>;
        }
        let reviews = this.state.foodItem.reviews.map(review =>{
            return (
                <div className="food-item-review-container">
                    <div className="rating-container">
                        rating: {review.rating}
                    </div>
                    <div className="review-container">
                        {review.review}
                    </div>
                </div>
            );
        })
        return (
            <div className="transition-item food-item-review-page">
                <div className="food-item-information">
                    {this.state.foodTruck.name}
                    <button onClick={this.goBack.bind(this)}>go back</button>
                </div>
                <div className="food-items-reviews-container">
                    {reviews}
                </div>
            </div>
        );
    }

    goBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

}


export default FoodItemReviews;
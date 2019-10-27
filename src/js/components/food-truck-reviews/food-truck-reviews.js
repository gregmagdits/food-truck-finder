import React, { Component } from "react";
import "./food-truck-reviews.scss"

class FoodTruckReviews extends Component{

    constructor(props){
        super(props)
        this.state = {
            foodTruck : props.foodTruck
        }
        console.log("foodTruck: ", this.state.foodTruck)
    }
    render(){
        if (!this.state.foodTruck){
            return <div>Loading....</div>
        }

        let reviews = this.state.foodTruck.reviews.map(review => {
            return (
                <div className="food-truck-review-container">
                    <div className="rating-container">
                        rating: {review.rating}
                    </div>
                    <div className="review-container">
                        {review.review}
                    </div>
                </div>
            );
        });

        return (
            <div className="transition-item review-page">
                <div className="food-truck-information">
                    {this.state.foodTruck.name}
                    <button onClick={this.goBack.bind(this)}>go back</button>
                </div>
                <div className="food-truck-reviews-container">
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

export  default FoodTruckReviews;
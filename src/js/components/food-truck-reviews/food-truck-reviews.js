import React, { Component } from "react";
import "./food-truck-reviews.scss"
import FoodTruckService from "../../services/FoodTruckService";
import {connect} from 'react-redux'

function mapStateToProps (state) {
    return { session: state.session }
}
// function mapDispatchToProps (dispatch) {
//     return {
//         dispatchSession: session => dispatch(dispatchSession(session))
//     }
// }

class FoodTruckReviews extends Component{

    constructor(props){
        super(props)
        this.state = {
            foodTruck : props.foodTruck
        }
        console.log("foodTruck: ", this.state.foodTruck)
        this.service = new FoodTruckService();
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
                <div id="leaveReview">
                    <button onClick={this.leaveReview.bind(this)}>
                        leaveReview
                    </button>
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

    leaveReview(e){
        e.preventDefault();
        if (!this.props.session.isLoggedIn){

            ;
        }else{
            this.service.leaveFoodTruckReview(/*user, truck, rating, review*/).then((result,error) => {
                console.log('returned from service;')
            })
        }
    }
}

export  default connect(mapStateToProps)(FoodTruckReviews);
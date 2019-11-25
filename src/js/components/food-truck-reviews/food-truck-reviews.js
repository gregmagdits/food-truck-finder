import React, { Component } from "react";
import "./food-truck-reviews.scss"
import FoodTruckService from "../../services/FoodTruckService";
import {connect} from 'react-redux'
import ReactModal from 'react-modal';
import Modal from 'react-modal';

function mapStateToProps (state) {
    return { session: state.session }
}

class FoodTruckReviews extends Component{

    constructor(props){
        super(props)
        this.state = {
            foodTruck : props.foodTruck,
            review: '',
            rating: '',
            modal : {
                modalIsOpen: false,
                content : ''
            }
        }
        console.log("foodTruck: ", this.state.foodTruck)
        this.service = new FoodTruckService();

        // set state here from url params
        // if (window.location.search.indexOf('callback') > 0){
        //     var urlParams = new URLSearchParams(window.location.search);
        //     this[urlParams.get('callback')].bind(this).apply(urlParams.getAll('params'))
        // }
    }

    render(){
        if (!this.state.foodTruck){
            return <div>Loading....</div>
        }

        let reviews = this.state.foodTruck.reviews.map(review => {
            return (
                <div className="food-truck-review-container">
                    <div className="rating-container">
                        rating: [{review.rating}] {review.review}
                    </div>
                </div>
            );
        });
        let _me = this;

        return (
            <div className="transition-item review-page">
                <ReactModal isOpen={_me.state.modal.modalIsOpen} ariaHideApp={false} contentLabel="Minimal Modal Example"   overlayClassName="ReactModal__Overlay">
                    <p className="modalcontent"> {_me.state.modal.content} </p>
                </ReactModal>
                <div>
                    <div className="food-truck-information">
                        {this.state.foodTruck.name}
                        <button onClick={this.goBack.bind(this)}>go back</button>
                    </div>
                    <div className="food-truck-reviews-container">
                        {reviews}
                    </div>
                    <form action="" id="review-form">
                        <textarea name="" id="review" cols="30" rows="10"/>
                        <select id={"rating"}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>

                        <submit id="submit-review" className="button"  onClick={this.leaveReview.bind(this)}>submit</submit>
                    </form>
                </div>


            </div>
        );
    }

    goBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    leaveReview(e){
        let _me = this;
        if (e){
            e.preventDefault();
        }
        let rating = document.getElementById('rating').value;
        let review = document.getElementById('review').value;
        let foodTruck = this.state.foodTruck;

        if (!this.props.session.isLoggedIn){
            this.props.history.push({
               pathname: `/login`,
                search: `?targetUri=${window.location.href}&callback=leaveReview&rating=${rating}&review=${review}`,
            });
        }else{
            // either we were previously logged in, or this is invoked by callback

            this.service.leaveFoodTruckReview(this.props.session.user, this.props.session.credentials.idToken, this.state.foodTruck, rating, review).then((result,error) => {
                console.log('returned from service ', result)
                document.getElementById('rating').value = '';
                document.getElementById('review').value = '';

                _me.setState({
                    foodTruck: result,
                    modal : {
                        modalIsOpen: true,
                        content: `Successfully submitted review`
                    }
                })
            })
        }
    }
}

export  default connect(mapStateToProps)(FoodTruckReviews);

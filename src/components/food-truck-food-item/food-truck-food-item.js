import React, { Component } from "react";

class FoodTruckFoodItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            item : props.item
        }
    }


    render(){
        if (!this.state.item){
            return <div/>
        }


        return (
            <div>
                {this.state.item.name} | {this.state.item.description} | {this.state.item.price}
            </div>

        );
    }

}

export default FoodTruckFoodItem;
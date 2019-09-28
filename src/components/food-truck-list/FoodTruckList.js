import React, { Component } from 'react';
import mexican from '../../img/mexican-on-the-run.jpg'; // Tell Webpack this JS file uses this image
import kommie from '../../img/kommie-pig.jpg'; // Tell Webpack this JS file uses this image
import snake from '../../img/snake-hill.jpg'; // Tell Webpack this JS file uses this image
import './FoodTruckList.css';

class FoodTruckList extends Component {
    constructor(props) {
        super(props);
        //this.state = {date: new Date()};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action"><img src={mexican}
                                                                                    className="food-truck-img rounded-circle"
                                                                                    alt="mexican-on-the-run"/>Mexican On
                    The Run <small>.1 miles</small></a>
                <a href="#" className="list-group-item list-group-item-action"><img src={kommie}
                                                                                    className="food-truck-img rounded-circle"
                                                                                    alt="kommie-pig"/>Kommie Pig <small>.1
                    miles</small></a>
                <a href="#" className="list-group-item list-group-item-action"><img src={snake}
                                                                                    className="food-truck-img rounded-circle"
                                                                                    alt="snake-hill"/>Snake Hill <small>.1
                    miles</small></a>
            </div>
        );
    }
}

export default FoodTruckList;

import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import randomColor from "randomcolor";
import GoogleMapReact from "google-map-react"
import "./google-map.scss"
import "./item.scss"
import {secrets} from "./secrets"

class List extends Component {

  shouldComponentUpdate() {
    return false;
  }
  render() {
    function importAll(r) {
      let images = {};
      r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
      return images;
    }

    const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));

    {/*<img src={images['doggy.png']} />*/}

    let defaultProps = {
      center: {
        lat: 39.286820,
        lng: -76.570290
      },
      zoom: 17
    };
    console.log("render list");
    let arr = [{name:"Snake Hill",description:"sausages",image:"snake-hill.jpg","distance" :.1},
      {name:"Kommie Pig",description:"BBQ by commies",image:"kommie-pig.jpg","distance" :.2},
      {name:"Mexican on The Run",description:"Mexican food",image:"mexican-on-the-run.jpg","distance" :.3}];
    let listItems = arr.map((truck, index) => {
      return (
        <div
          key={index}
          onClick={this.goToItem.bind(this)}
          className={"list-group-item list-group-item-action"}
        >

          <img src={images[truck.image]} className="food-truck-img rounded-circle" alt={truck.name}/>{truck.name}<small>{truck.distance} miles</small>
        </div>
      );
    });
    return <div className="transition-item list-page">
      <div className={"map-container"}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: secrets.google.maps_api_key }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
        </GoogleMapReact>
      </div>
      <div className={"list-group"}>

        {listItems}
      </div>

    </div>;
  }

  goToItem() {
    this.props.history.push({
      pathname: "/item"
    });
  }
}

export default List;

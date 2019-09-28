import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import GoogleMapReact from 'google-map-react';
import FoodTruckList from "../food-truck-list/FoodTruckList";
function App() {
    let defaultProps = {
        center: {
            lat: 39.286820,
            lng: -76.570290
        },
        zoom: 17
    };

  return (
      <div>
          <div className="map-container">
              <GoogleMapReact
                  bootstrapURLKeys={{ key: "AIzaSyC9k1gUPxSmkEoQJfpOL5n7INszO9NRCbY" }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
              >
              </GoogleMapReact>
              <FoodTruckList/>
          </div>

      </div>
  );
}

export default App;

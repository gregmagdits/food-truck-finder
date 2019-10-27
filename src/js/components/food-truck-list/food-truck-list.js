import React, { Component } from "react";
import GoogleMapReact from "google-map-react"
import "./google-map.scss"
import  "./food-truck-list.scss"
//import {secrets} from "../../secrets"
import {secrets} from "../../../secrets";
import FoodTruckListItem from "./food-truck-list-item/food-truck-list-item";
import appConfig from '../../config'
import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth'
import {dispatchSession} from "../../redux/actions/session";
import { connect } from 'react-redux'


function mapStateToProps (state) {
  return { session: state.session }
}
function mapDispatchToProps (dispatch) {
  return {
    dispatchSession: session => dispatch(dispatchSession(session))
  }
}

class FoodTruckList extends Component {

  constructor(props){
    super(props);
    this.defaultMapProps = {
      center: {
        lat: 39.286820,
        lng: -76.570290
      },
      zoom: 17
    };
  }

  shouldComponentUpdate() {
    return false;
  }
  render() {
    const appWebDomain = appConfig.userPoolBaseUri.replace('https://', '').replace('http://', '')
    const auth = new CognitoAuth({
      UserPoolId: appConfig.userPool,
      ClientId: appConfig.clientId,
      AppWebDomain: appWebDomain,
      TokenScopesArray: appConfig.tokenScopes,
      RedirectUriSignIn: appConfig.callbackUri,
      RedirectUriSignOut: appConfig.signoutUri
    })
    const _me = this;
    auth.userhandler = {
      onSuccess: function (result) {
        console.log('success-handler result: ', result)
        const session = {
          credentials: {
            accessToken: result.accessToken.jwtToken,
            idToken: result.idToken.jwtToken,
            refreshToken: result.refreshToken.token
          },
          user: {
            userName: result.idToken.payload['cognito:username'],
            email: result.idToken.payload.email
          }
        }
        _me.props.dispatchSession( session );
      },
      onFailure: function (err) {
        console.log('error is: ', err)

      }
    }
    // If there's no auth code in the URL or we're now logged into, redirect to the root page
    if ((!this.props.location.hash && !this.props.location.search) || this.props.session.isLoggedIn) {
      console.log("INITIALIZING SESSION")
      console.log("session: ", this.props.session)
      auth.getSession();
    }else if (this.props.location.hash){
      var curUrl = window.location.href;
      auth.parseCognitoWebResponse(curUrl)
    }

    let listItems = this.props.foodTruckArray.map((truck, index) => {
      return (<FoodTruckListItem index={index} foodTruck={truck} />)
    });

    return (
        <div className="transition-item list-page">
          <div className={"map-container"}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: secrets.google.maps_api_key }}
                defaultCenter={this.defaultMapProps.center}
                defaultZoom={this.defaultMapProps.zoom}
            >
            </GoogleMapReact>
          </div>
          <div className={"list-group"}>
            {listItems}
          </div>
        </div>
    );
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(FoodTruckList);

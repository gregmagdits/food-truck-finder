import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect, withRouter} from 'react-router-dom';
import {dispatchSession, initSessionFromCallbackURI} from "../../redux/actions/session";
//import appConfig from '../../config'
import {CognitoAuth} from "amazon-cognito-auth-js";
import appConfig from "../../config";
import './login.scss'

/* This is where we could map url to props if we wanted to . need return_to_uri and callback and params*/

function mapStateToProps (state) {
    return { session: state.session }
}
function mapDispatchToProps (dispatch) {
    return {
        setSession: href => dispatch(dispatchSession(href))
    }
}

class Login extends Component{

    // cant be dom element that is called before redirecting because of limitation of page-transition library
    // has to be dom element to get access to history api

    constructor(props){
        super(props)
        console.log('props: ', props)
    }
    componentDidMount() {

    }

    render() {
        window.localStorage.setItem('targetUri', `${this.props.targetUri}`);
        window.localStorage.setItem('callback', `${this.props.callback}`);
        window.localStorage.setItem('params', `${this.props.params}`);

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
                _me.props.setSession( session );

                let targetUri = window.localStorage.getItem('targetUri');
                let callback = window.localStorage.getItem('callback');
                let params = window.localStorage.getItem('params');
                if (targetUri !== 'undefined'){
                    console.log(`pushing ${targetUri}?callback=${callback}&params=${params}`)
                    _me.props.history.push(`${targetUri}?callback=${callback}&params=${params}`);
                }else{
                    return <Redirect to="/" />
                }
                //go back to whatever page you came from and do whatever you were doing
            },
            onFailure: function (err) {
                console.log('error is: ', err)
            }
        }
        // If there's no auth code in the URL or we're now logged into, redirect to the root page
        if (!this.props.location.hash && !this.props.session.isLoggedIn) {
            console.log("INITIALIZING SESSION")
            console.log("session: ", this.props.session)
            auth.getSession();
            return <Redirect to="/" />
        }else if (this.props.location.hash){
            console.log("CHECKING SESSION")

            var curUrl = window.location.href;
            //sets the session object in redux. Also triggers success handler which will navigate back to targetUri
            auth.parseCognitoWebResponse(curUrl)
        }
        return (
            <div className="transition-item login-page">
                <div>This is the login page</div>
            </div>
        );
   }
}


//need router and session
export  default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
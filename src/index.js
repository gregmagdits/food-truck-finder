import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import Amplify from 'aws-amplify';
import { Provider } from 'react-redux'
import store from './js/redux/store'
import {secrets} from "./secrets";

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region : secrets.cognito.REGION,
        userPoolId: secrets.cognito.USER_POOL_ID,
        userPoolWebClientId : secrets.cognito.APP_CLIENT_ID
    }
});
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

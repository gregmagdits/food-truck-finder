import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {secrets} from "./secrets"
import Amplify from 'aws-amplify';


Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region : secrets.cognito.REGION,
        userPoolId: secrets.cognito.USER_POOL_ID,
        userPoolWebClientId : secrets.cognito.APP_CLIENT_ID
    }
});
ReactDOM.render(<App />, document.getElementById('root'));

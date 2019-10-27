import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { config as AWSConfig } from 'aws-sdk'
import appConfig from '../../config'

AWSConfig.region = appConfig.region
// top of hierarchy
// Parse the response from a Cognito callback URI (assumed a token or code is in the supplied href). Returns a promise.
const parseCognitoWebResponse = (href) => {
    return new Promise((resolve, reject) => {
        const appWebDomain = appConfig.userPoolBaseUri.replace('https://', '').replace('http://', '')
        const auth = new CognitoAuth({
            UserPoolId: appConfig.userPool,
            ClientId: appConfig.clientId,
            AppWebDomain: appWebDomain,
            TokenScopesArray: appConfig.tokenScopes,
            RedirectUriSignIn: appConfig.callbackUri,
            RedirectUriSignOut: appConfig.signoutUri
        })

        // userHandler will trigger the promise
        auth.userhandler = {
            onSuccess: function (result) {
                console.log('result is: ', result)
                resolve(result)
            },
            onFailure: function (err) {
                reject(new Error('Failure parsing Cognito web response: ' + err))
            }
        }
        auth.parseCognitoWebResponse(href)
    })
}

// top of hierarchy
// Gets a new Cognito session. Returns a promise.
const getCognitoSession = () => {
    return new Promise((resolve, reject) => {
        const pool = new CognitoUserPool({
            UserPoolId: appConfig.userPool,
            ClientId: appConfig.clientId
        });
        const cognitoUser = pool.getCurrentUser()
        cognitoUser.getSession((err, result) => {
            if (err || !result) {
                reject(new Error('Failure getting Cognito session: ' + err))
                return
            }

            // Resolve the promise with the session credentials
            console.debug('Successfully got session: ' + JSON.stringify(result))
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
            resolve(session)
        })
    })
}

// Get the URI of the hosted sign in screen
const getCognitoSignInUri = () => {
    const signinUri = `${appConfig.userPoolBaseUri}/login?response_type=code&client_id=${appConfig.clientId}&redirect_uri=${appConfig.callbackUri}`
    return signinUri
}

// Sign out of the current session (will redirect to signout URI)
const signOutCognitoSession = () => {
    const appWebDomain = appConfig.userPoolBaseUri.replace('https://', '').replace('http://', '')
    const auth = new CognitoAuth({
        UserPoolId: appConfig.userPool,
        ClientId: appConfig.clientId,
        AppWebDomain: appWebDomain,
        TokenScopesArray: appConfig.tokenScopes,
        RedirectUriSignIn: appConfig.callbackUri,
        RedirectUriSignOut: appConfig.signoutUri
    })
    auth.signOut()
}

export default {
    getCognitoSession,
    getCognitoSignInUri,
    parseCognitoWebResponse,
    signOutCognitoSession
}

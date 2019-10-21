const config = {
    api_base : 'http://3.229.202.80:8080',
    "region": "eu-west-2",
    "userPool": "eu-west-2_z1Go5XdrZ",
    "userPoolBaseUri": "https://food-truck-finder.auth.us-east-1.amazoncognito.com",
    "clientId": "6grerrv1pj4k3pv8a4fkrqagcn",
    "callbackUri": "http://localhost:3000/callback",
    "signoutUri": "http://localhost:3000",
    "tokenScopes": [
        "openid",
        "email",
        "profile",
        "http://cognito-demo-api.arronharden.com/hello-world.all"
    ],
    "apiUri": "http://cognito-demo-api.arronharden.com"
}
export default config;
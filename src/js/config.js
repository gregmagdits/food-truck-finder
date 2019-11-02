const config = {
    api_base : 'http://3.229.202.80:8080',
    "region": "us-east-1",
    "userPool": "us-east-1_MoQZph5Gu",
    "userPoolBaseUri": "https://food-truck-finder.auth.us-east-1.amazoncognito.com",
    "clientId": "6grerrv1pj4k3pv8a4fkrqagcn",
    "callbackUri": "http://localhost:3000/",
    "signoutUri": "http://localhost:3000",
    "tokenScopes": [
        "openid",
        "email",
        "profile"
    ]
}
export default config;
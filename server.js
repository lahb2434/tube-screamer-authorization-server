const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config()

app.use(cors())
   .use(bodyParser.json())

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  })
  
  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post('/login', (req, res) => {
  const code = req.body.code
  console.log(process.env.REACT_APP_CLIENT_ID)
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/'
  })
  spotifyApi
    .authorizationCodeGrant(code)
    .then( data => { 
      res.json({
        expiresIn: data.body.expires_in,
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token
      })
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })

});


app.listen(3001);
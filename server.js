const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
let spotifyApi;

dotenv.config()

app.use(cors())
   .use(bodyParser.json())

app.post('/login', (req, res) => {
  const code = req.body.code
  console.log(code)
  spotifyApi = new SpotifyWebApi({
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
      spotifyApi.setAccessToken(data.body.access_token);
      spotifyApi.setRefreshToken(data.body.refresh_token);
    }).catch(error => {
        console.log(error)
        res.sendStatus(400)
    })

});

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refresh_token
  spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000/',
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    refreshToken
  })
  
  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        expiresIn: data.body.expires_in,
        accessToken: data.body.access_token
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post('/search', (req, res) => {
  const searchQuery = req.body.searchQuery
  // const spotifyApi = new SpotifyWebApi({
  //   redirectUri: 'http://localhost:3000/',
  //   clientId: process.env.REACT_APP_CLIENT_ID,
  //   clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  //   refreshToken
  // })

  spotifyApi
    .searchTracks(searchQuery)
    .then(response => {
     res.json(response.body.tracks.items)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})


app.listen(8008);
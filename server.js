const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express')
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

dotenv.config()

const spotifyApi = new SpotifyWebApi()

spotifyApi.setCredentials({
  redirectUri: 'http://localhost:3000/',
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
});

server
  .use(cors())
  .use(bodyParser.json())

server.post('/login', (req, res) => {
  const code = req.body.code
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

server.post('/refresh', (req, res) => {
  console.log(spotifyApi)
  // const refreshToken = req.body.refresh_token
  // spotifyApi = new SpotifyWebApi({
  //   redirectUri: 'http://localhost:3000/',
  //   clientId: process.env.REACT_APP_CLIENT_ID,
  //   clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  //   refreshToken
  // })
  
  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        expiresIn: data.body.expires_in,
        accessToken: data.body.access_token
      })
      spotifyApi.setAccessToken(data.body.access_token);
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

server.post('/search', (req, res) => {
  const searchQuery = req.body.searchQuery
  console.log(searchQuery)
 
  spotifyApi
    .searchTracks(searchQuery)
    .then(response => {
     res.json(response.body.tracks.items)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })

server.post('/requestAccess', (req, res) => {
  spotifyApi
    .getAccessToken()
    .then(response => {
      console.log(response)
    })
})
})


server.listen(8008);
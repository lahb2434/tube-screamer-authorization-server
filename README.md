# tube-screamer-authorization-server
Server dedicated to requesting authorization and retreiving song information from Spotify Web API

## Installation

Install using [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

```bash
$ npm install
```
Create .env file<br>
Set Spotify Web API Client_ID and Client_Secret in .env file

```
CLIENT_ID = 02ee4d58dclientID20aab88838
CLIENT_SECRET = 6a15d74dclientSecret4a58528
```
To get Client_ID and Client_Secret navigate to [Spotify Web API](https://developer.spotify.com/dashboard/applications), login or create an account, then click on the create an app button, follow prompts.

To start server 
```
$ npm run dev
```


## Usage

tube-screamer-authorization-server was designed for use with [tube-screamer](https://github.com/lahb2434/tube-screamer) application.


## License
[MIT](https://choosealicense.com/licenses/mit/)
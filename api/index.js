const cors = require("cors");
const express = require("express");
const app = express();
const Twit = require('twit'); 
const dotenv = require('dotenv');
dotenv.config();

const T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})
app.use(cors({ origin: true }));

app.get('/api/search', (req, res) => {
    const {q, count} = req.query;
    T.get('search/tweets', { q, count }, function(err, data, response) {
      res.send(data)
    })
});

const server = app.listen(process.env.PORT || 3001, () => {
    console.log('🚀server started: ', process.env.PORT || 3001);
  });
  
  module.exports = app;
const express = require('express');
const request = require('postman-request');
const cors = require('cors');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, 'build')))
  .use(cors({credentials: true}));

const port = process.env.REACT_APP_PORT || 3001;
const key = process.env.REACT_APP_API_KEY;
const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

app.get('/', (req, res) => {
  console.log('hello');
  res.send('Hello World!');
});

app.get('/api/single-img', (req, res) => {
  
  console.log('connection received!');
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.json(body);
    } else {
      console.log(error);
    }
  })
});

app.get('/api/range-imgs', (req, res) => {
  const start_date = req.query.start_date;
  const end_date = req.query.end_date;

  let newUrl = url + `&start_date=${start_date}&end_date=${end_date}`;

  request(newUrl, (error, response, body) => {
    console.log(newUrl);
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      console.log(error);
    }
  });

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
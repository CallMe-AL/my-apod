const express = require('express');
const request = require('postman-request');
const cors = require('cors');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3001;
const key = process.env.REACT_APP_API_KEY;
const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')))
  .use(cors({credentials: true}));

app.get('/', (req, res) => {
  console.log('hello');
  res.send('Hello World!');
});

app.get('/api/single-img', (req, res) => {
  // created in case we're receiving a specific date to modify below
  let newurl = '';

  if (req.query.date) {
    console.log('query: ', req.query.date);
    const date = req.query.date;
    newurl += `&date=${date}`;
  }
  // console.log('connection received!');
  request(url + newurl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else if (response.statusCode > 499 && response.statusCode < 600) {
      res.send({error: `Sorry, NASA\'s servers are current having internal issues. Please try again later. Status code: ${response.statusCode}.`});
    } else if (response.statusCode === 404) {
      res.send({error: `Sorry, NASA doesn\'t have an image for this day :(.`});
    } else {
      console.log(response.statusCode);
      res.send({error: `Sorry, our server is currently having internal issues. Please try again later. Status code: ${response.statusCode}. Date received: ${req.query.date}`});
    }
  })
});

app.get('/api/range-imgs', (req, res) => {
  const start_date = req.query.start_date;
  const end_date = req.query.end_date;

  let newUrl = url + `&start_date=${start_date}&end_date=${end_date}`;

  request(newUrl, (error, response, body) => {

    if (!error && response.statusCode === 200) {
      res.send(body);
    } else if (response.statusCode > 499 && response.statusCode < 600) {
      res.send({error: `Sorry, NASA\'s servers are current having internal issues. Please try again later. Status code: ${response.statusCode}.`});
    } else if (response.statusCode === 404) {
      res.send({error: `Sorry, NASA doesn\'t have an image for this day :(.`});
    } else {
      console.log(response.statusCode);
      res.send({error: `Sorry, our server is currently having internal issues. Please try again later. Status code: ${response.statusCode}. Date received: ${req.query.date}`});
    }
  });

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
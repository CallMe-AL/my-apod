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
  
  console.log('connection received!');
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else if (response.statusCode > 499 && response.statusCode < 600) {
      res.send({error: `Sorry, NASA\'s servers are current having internal issues. Please try again later. Status code: ${response.statusCode}.`});
    } else {
      console.log(response.statusCode);
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
    } else {
      console.log(response.statusCode);
    }
  });

});

app.get('/test', (req, res) => {
  res.send('hello!');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
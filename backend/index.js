const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const { fetchResumeList } = require('./parser');
app.use(cors());



const jsonParser = bodyParser.json()

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/search', jsonParser, (req, res) => {
  fetchResumeList(req.body)
});



app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});



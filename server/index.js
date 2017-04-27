var express = require('express');
var app = express();
var body = require('body-parser');
var request = require('request');

app.use(body.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/import', function (req, res) {
  // TODO
  var username = req.body.username;
  console.log('inside POST!', username);

  var options = {
    uri: `https://api.github.com/users/${username}/repos`
  }

  request(options).pipe(res);

  console.log(options);

  res.end();
});

app.get('/repos', function (req, res) {
  // TODO
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


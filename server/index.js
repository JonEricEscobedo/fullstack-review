var express = require('express');
var app = express();
var body = require('body-parser');
var request = require('request');
var Repo = require('../database');

app.use(body.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/import', function (req, res) {
  // TODO
  var username = req.body.username;
  console.log('Inside POST in Express...');

  request({
    url: `https://api.github.com/users/${username}/repos`,
    headers: {'user-agent': 'JonEricEscobedo'},
    json: true
  }, function(error, response, body) {

    for (var i = 0; i < body.length; i++) {
      var username = body[i].owner.login;
      var userId = body[i].owner.id;
      var repoId = body[i].id;
      var repoName = body[i].name;
      var repoSnippet = body[i].description;
      var repoUrl = body[i].html_url;
      var forks = body[i].forks;
      var length = body.length;

      var newUser = new Repo({
        username: username,     // owner.login
        user_id: userId,      // owner.id
        repo_id: repoId,      // id
        repo_name: repoName,    // name
        repo_snippet: repoSnippet, // description
        repo_url: repoUrl,     // html_url
        forks: forks         // forks
      });
      
      newUser.save(function(err, data) {
        if (err) {
          console.log('Error - probably a duplicate entry', err);
        } else {
          console.log('Data has been saved', data);
        }
      });
    }

  });

  res.end();
});

app.get('/repos', function (req, res) {
  console.log('Inside GET in Express...');
  
  Repo.find({}, function(error, result) {
    return res.json(result);    
  })
  .sort({'forks': -1})

});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


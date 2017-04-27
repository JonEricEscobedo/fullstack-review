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
  console.log('inside POST!', username);

  request({
    url: `https://api.github.com/users/${username}/repos`,
    headers: {'user-agent': 'JonEricEscobedo'},
    json: true
  }, function(error, response, body) {
    // console.log(body)


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
          console.log('SEVERE ERROR', err);
        } else {
          console.log('SAVED!', data);
        }
      });
    }

    // console.log(`${length} ${username} ${userId} ${repoName} ${forks}`);

    // Temp data
    // var username = 'wakabarf';
    // var userId = 12345;
    // var repoId = 9876;
    // var repoName = 'Fart Repo';
    // var repoSnippet = 'A small shitty repo';
    // var repoUrl = 'http://www.github.com/repo1';
    // var forks = 666;

    // var jonEric = new Repo({
    //   username: username,     // owner.login
    //   user_id: userId,      // owner.id
    //   repo_id: repoId,      // id
    //   repo_name: repoName,    // name
    //   repo_snippet: repoSnippet, // description
    //   repo_url: repoUrl,     // html_url
    //   forks: forks         // forks
    // });

    // jonEric.save(function(err, data) {
    //   if (err) {
    //     console.log('SEVERE ERROR', err);
    //   } else {
    //     console.log('Saved', data);
    //   }
    // })
  });

  res.end();
});

app.get('/repos', function (req, res) {
  // TODO
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


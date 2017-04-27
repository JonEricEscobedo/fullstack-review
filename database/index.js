var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String, // owner.login
  user_id: Number,  // id
  repos: [{repo_id: Number, repo_snippet: String, repo_url: String}] // name, description, html_url
});

var Repo = mongoose.model('Repo', repoSchema);)

module.exports = Repo;


/*
When a user types in a GitHub username and submits the form, your app should:
  Send a POST request to your express server
  Your server should GET that user's repos from GitHub's API
  Your server should then save the repos to the database

When a user visits / refreshes your page, your app should:
  GET the top (how will you determine top?) 25 repos in your express server's database
  Take those repos and display them on the page

*/
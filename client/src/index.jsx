import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    var searchTerm = {username: term }
    $.ajax({
      type: 'POST',
      url: '/repos/import',
      // data: searchTerm
      contentType: 'application/json',
      data : JSON.stringify(searchTerm)
    })
    .done(function(data) {
      console.log('success', data);
    })
    .fail(function(err) {
      console.log('There was an error!', err);
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
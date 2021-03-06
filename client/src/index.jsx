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
    var context = this;
    var searchTerm = {username: term }
    $.ajax({
      type: 'POST',
      url: '/repos/import',
      contentType: 'application/json',
      data : JSON.stringify(searchTerm)
    })
    .done(function(data) {
      console.log('success', data);
      context.componentDidMount();
    })
    .fail(function(err) {
      console.log('There was an error!', err);
    })
  }

  componentDidMount() {
    var context = this;
    console.log('Component mounted... calling GET...');
    $.ajax({
      type: 'GET',
      url: '/repos'
    })
    .done(function(data) {
      // console.log('GET done... doing something...');
      context.setState({repos: data});
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
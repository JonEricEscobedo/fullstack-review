import React from 'react';

const RepoList = (props) => {
  // var parsedProps = JSON.parse(props);
  // console.log(props.repos)
  var listItems = props.repos.map((repo) => {
    return <ul>User: {repo.username}<li>Repo Name: {repo.repo_name}</li><li>Forks: {repo.forks}</li></ul>
  })

  console.log(listItems);

  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      <div>
        Here are the top 25 repos:
        {listItems}
      </div>
    </div>
  )
}
export default RepoList;
import React from 'react';

const RepoList = (props) => {
  var listItems = props.repos.map((repo, index) => {
    if (index < 25) {
      return <ul>#{index+1} {repo.username}<li>Repo Name: {repo.repo_name}</li><li>Forks: {repo.forks}</li></ul>  
    }
  })

  console.log(listItems);

  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      <div>
        Here are the top 25 forked repos:
        {listItems}
      </div>
    </div>
  )
}
export default RepoList;
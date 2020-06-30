const axios = require('axios')

const getGithubInfo = (username) => {
    axios.post('http://localhost:5001/stint-landing/us-central1/getGithubRepos', {
      githubUser: username
    })
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.error(error)
    })
}

module.exports = {
    getGithubInfo
}

const axios = require('axios')

const getGithubInfo = (user) => {
    axios.post('http://localhost:5001/stint-staging-eb100/us-central1/getGithubRepos', {
      githubUser: user
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

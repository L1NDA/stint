const axios = require('axios')

const getGithubInfo = () => {
    axios.post('http://localhost:5001/stint-landing/us-central1/getGithubRepos', {
      githubUser: 'charlesma4'
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

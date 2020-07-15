const axios = require("axios");

const getGithubInfo = (user) => {
  return axios
    .post(
      "http://localhost:5001/stint-staging-eb100/us-central1/getGithubRepos",
      {
        githubUser: user,
      }
    )
    .then(res => {
      return res
    })
    .catch(error => {
      console.log("ERROR MESSAGE", error.message)
      throw error
    })
}

module.exports = {
  getGithubInfo,
};

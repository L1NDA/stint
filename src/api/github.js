const axios = require("axios");
const { INDEX_URL } = require("../config");

const getGithubInfo = (user) => {
  let targetUrl = INDEX_URL + "getGithubRepos";
  return axios
    .post(targetUrl, {
      githubUser: user,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  getGithubInfo,
};

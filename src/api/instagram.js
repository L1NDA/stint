const axios = require("axios");
const { FUNCTIONS_INDEX_URL } = require("../config");

const getInstaInfo = (user) => {
  let targetUrl = FUNCTIONS_INDEX_URL + "getInstaInfo";
  return axios
    .post(targetUrl, {
      instaUser: user,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  getInstaInfo,
};

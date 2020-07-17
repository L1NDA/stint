const axios = require("axios");
const { INDEX_URL } = require("../config");

const getMediumInfo = (user) => {
  let targetUrl = INDEX_URL + "getMediumInfo";
  return axios
    .post(targetUrl, {
      mediumUser: user,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  getMediumInfo,
};

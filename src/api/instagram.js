const axios = require("axios");
const { INDEX_URL } = require("../config")

const getInstaInfo = (user) => {
  let targetUrl = INDEX_URL + "getInstaInfo"
  return axios
    .post(
      targetUrl,
      {
        instaUser: user,
      }
    )
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

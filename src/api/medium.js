const axios = require("axios");

const getMediumInfo = (user) => {
  return axios
    .post(
      "http://localhost:5001/stint-staging-eb100/us-central1/getMediumInfo",
      {
        mediumUser: user,
      }
    )
    .then((res) => {
      console.log("RES", res);
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  getMediumInfo,
};

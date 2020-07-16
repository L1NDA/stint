const axios = require("axios");

const getYoutubeInfo = (user) => {
  axios
    .post(
      "http://localhost:5001/stint-staging-eb100/us-central1/getYoutubeInfo",
      {
        youtubeUser: user,
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  getYoutubeInfo,
};

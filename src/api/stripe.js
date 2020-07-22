const axios = require("axios");
const { INDEX_URL } = require("../config");

const getPaymentIntent = () => {
  let targetUrl = INDEX_URL + "getPaymentIntent";
  return axios
    .post(targetUrl)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  getPaymentIntent,
};

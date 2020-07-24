const axios = require("axios");
const { INDEX_URL } = require("../config");

const createCheckoutSession = (product_data, unit_amount, success_url, cancel_url) => {
  console.log("CREATES")
  let targetUrl = INDEX_URL + "createCheckoutSession";
  return axios
    .post(targetUrl, {
      product_data,
      unit_amount,
      success_url,
      cancel_url,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  createCheckoutSession,
};

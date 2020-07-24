const axios = require("axios");
const { INDEX_URL } = require("../config");

const getStripeCheckoutSession = (product_data, unit_amount, success_url, cancel_url) => {
  let targetUrl = INDEX_URL + "getStripeCheckoutSession";
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
  getStripeCheckoutSession,
};

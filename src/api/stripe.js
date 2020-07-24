const axios = require("axios");
const { INDEX_URL } = require("../config");

const createCheckoutSession = (product_data, unit_amount, success_url, cancel_url) => {
  if (Object.keys(product_data).length === 0) {
    throw new Error("Please enter non-empty dictionary of product_data.")
  }
  if (unit_amount <= 0.5) {
    throw new Error("Cannot accept payments less than $0.50.")
  }

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

const axios = require("axios");
const { FUNCTIONS_INDEX_URL } = require("../config");

const listAllCustomers = (emailFilter=null) => {
  let targetUrl = FUNCTIONS_INDEX_URL + "listAllCustomers"
  return axios
    .post(targetUrl, {
      emailFilter,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    })
}

const createCheckoutSession = (product_data, unit_amount, success_url, cancel_url, metadata) => {
  if (Object.keys(product_data).length === 0) {
    throw new Error("Please enter non-empty dictionary of product_data.")
  }
  if (unit_amount <= 0.5) {
    throw new Error("Cannot accept payments less than $0.50.")
  }

  let targetUrl = FUNCTIONS_INDEX_URL + "createCheckoutSession";
  return axios
    .post(targetUrl, {
      product_data,
      unit_amount,
      success_url,
      cancel_url,
      metadata,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

const retrieveCheckoutSession = (sessionId) => {
  let targetUrl = FUNCTIONS_INDEX_URL + "retrieveCheckoutSession"
  return axios
    .post(targetUrl, {
      sessionId
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    })
}

module.exports = {
  listAllCustomers,
  createCheckoutSession,
  retrieveCheckoutSession,
};

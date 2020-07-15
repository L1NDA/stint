const axios = require('axios')

const getInstaInfo = (user) => {
    return axios.post('http://localhost:5001/stint-staging-eb100/us-central1/getInstaInfo', {
      instaUser: user
    })
    .then(res => {
      return res
    })
    .catch(error => {
      throw error
    })
}

module.exports = {
    getInstaInfo
}

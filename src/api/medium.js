const axios = require('axios')

const getMediumInfo = (user) => {
    return axios.post('http://localhost:5001/stint-staging-eb100/us-central1/getMediumInfo', {
      mediumUser: user
    })
    .then(res => {
      return res
    })
    .catch(error => {
      console.error(error)
    })
}

module.exports = {
    getMediumInfo
}

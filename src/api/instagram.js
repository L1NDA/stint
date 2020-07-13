const axios = require('axios')

const getInstaInfo = (user) => {
    axios.post('http://localhost:5001/stint-staging-eb100/us-central1/getInstaInfo', {
      instaUser: user
    })
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.error(error)
    })
}

module.exports = {
    getInstaInfo
}

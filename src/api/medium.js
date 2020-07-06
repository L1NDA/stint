const axios = require('axios')

const getMediumInfo = (user) => {
    axios.post('http://localhost:5001/stint-landing/us-central1/getMediumInfo', {
      mediumUser: user
    })
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.error(error)
    })
}

module.exports = {
    getMediumInfo
}

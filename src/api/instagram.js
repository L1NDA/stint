const axios = require('axios')

const getInstaInfo = (user) => {
    axios.post('http://localhost:5001/stint-landing/us-central1/getInstaInfo', {
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

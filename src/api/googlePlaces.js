const firebaseConfig = require('../config')
const axios = require('axios')

const apiUrl = "https://maps.googleapis.com/maps/api/place/autocomplete/json?types=(cities)&key=" + firebaseConfig.apiKey + "&input="

const getPredictions = async (textInput) => {
	console.log(textInput)
	let predictionResults = []
	await axios.get(apiUrl + encodeURI(textInput))
		.then(function (response) {
			if (response.predictions) {
				response.predictions.forEach(prediction => predictionResults.push(prediction.structuredFormatting.mainText))
			}
		})
		.catch(function (error) {
			console.error("Getting predictions errored out:", error)
		})
	return predictionResults
}

module.exports = {
	getPredictions
}

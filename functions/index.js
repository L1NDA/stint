const functions = require('firebase-functions');
const nodemailer = require("nodemailer")
const cors = require('cors')({origin: true});
const axios = require('axios')
const { mailConfig, googleApiKey } = require("./config")

const HOST_NAME = "smtp.gmail.com"
const PORT = 465

let transporter = nodemailer.createTransport({
    host: HOST_NAME,
    port: PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: mailConfig.address,
      pass: mailConfig.password,
    },
});

exports.sendEmail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        const {recipientAddress, subjectLine, htmlBody} = req.body;

        const mailOptions = {
            from: 'Stint <' + mailConfig.address + '>',
            to: recipientAddress,
            subject: subjectLine,
            html: htmlBody
        };
  
        return transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                return res.send(error.toString());
            }
            return res.status(200).send('Sent');
        });
    });    
});

const apiUrl = "https://maps.googleapis.com/maps/api/place/autocomplete/json?types=(cities)&key=" + googleApiKey + "&input="

exports.getCityPredictions = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		const {textInput} = req.body
		let predictionResults = new Set()
		return axios.get(apiUrl + encodeURI(textInput))
			.then(function (response) {
				if (response.data.predictions) {
					response.data.predictions.forEach(prediction => predictionResults.add(prediction.structured_formatting.main_text))
				}
				return res.status(200).send(Array.from(predictionResults))
			})
			.catch(function (error) {
				return res.send(error.toString())
			})
	})
})

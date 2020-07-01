const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

const nodemailer = require("nodemailer")

const { mailConfig } = require("./config")
const { githubConfig } = require("./config")

const axios = require('axios')
const moment = require('moment');

const AUTH_HEADER = { 'headers': 
                        { 'Authorization': githubConfig.apiId + ":" + githubConfig.apiSecret} 
                    }

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
            return res.status(200).send('Sent', info);
        });
    });    
});

exports.getGithubRepos = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        const {githubUser} = req.body
        const githubApiUrl = "https://api.github.com/users/" + githubUser + "/"

        let result = {}

        /* Check if valid github user */
        try {
            await axios.get(githubApiUrl, AUTH_HEADER)
        } catch (err) {
             return res.status(401).send(result)
        }
    
        await axios.get(githubApiUrl + "events", AUTH_HEADER)
            .then(function(response) {
                let now = moment().toISOString()
                let monthAgo = moment().subtract(1, "years").toISOString()
                let eventCount = 0
                response.data.forEach((event) => {
                    if (moment(event.created_at).isBetween(monthAgo, now)) {
                        eventCount += 1
                    }
                })
                result.eventCount = eventCount
            })

        await axios.get(githubApiUrl + "repos", AUTH_HEADER)
            .then(function(response) {
                if (response.data[0]) {
                    result.repoNames = [[response.data[0].name, response.data[1].description]]
                }
                if (response.data[1]) {
                    result.repoNames.push([response.data[1].name, response.data[1].description])
                }
                if (response.data[2]) {
                    result.repoNames.push([response.data[2].name, response.data[2].description])
                }
            })

        await axios.get(githubApiUrl + "orgs", AUTH_HEADER)
            .then(function(response) {
                result.orgs = []
                response.data.forEach((org) => {
                    result.orgs.push([org.login, org.description])
                })
            })

        return res.status(200).send(result)
    })
})

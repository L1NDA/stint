const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

const nodemailer = require("nodemailer")
const fetch = require("node-fetch");

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

<<<<<<< HEAD
// exports.getGithubRepos = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async () => {
//         const {githubUser} = req.body
//         const githubApiUrl = "https://api.github.com/users/" + githubUser + "/"
//
//         let result = {}
//
//         /* Check if valid github user */
//         try {
//             await axios.get(githubApiUrl, AUTH_HEADER)
//         } catch (err) {
//              return res.status(401).send(result)
//         }
//
//         await axios.get(githubApiUrl + "events", AUTH_HEADER)
//             .then(function(response) {
//                 let now = moment().toISOString()
//                 let yearsAgo = moment().subtract(1, "years").toISOString()
//                 let eventCount = 0
//                 response.data.forEach((event) => {
//                     if (moment(event.created_at).isBetween(yearsAgo, now)) {
//                         eventCount += 1
//                     }
//                 })
//                 result.eventCount = eventCount
//             })
//
//         await axios.get(githubApiUrl + "repos", AUTH_HEADER)
//             .then(function(response) {
//                 if (response.data[0]) {
//                     result.repoNames = [[response.data[0].name, response.data[0].description]]
//                 }
//                 if (response.data[1]) {
//                     result.repoNames.push([response.data[1].name, response.data[1].description])
//                 }
//                 if (response.data[2]) {
//                     result.repoNames.push([response.data[2].name, response.data[2].description])
//                 }
//             })
//
//         await axios.get(githubApiUrl + "orgs", AUTH_HEADER)
//             .then(function(response) {
//                 result.orgs = []
//                 response.data.forEach((org) => {
//                     result.orgs.push([org.login, org.description])
//                 })
//             })
//
//         return res.status(200).send(result)
//     })
// })
//
// exports.getInstaInfo = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async () => {
//         const {instaUser} = req.body
//         const profileUrl = "https://www.instagram.com/" + instaUser
//         const instaApiUrl = profileUrl + "/?__a=1"
//
//         let result = {}
//
//         result.linkToProfile = profileUrl
//
//         try {
//             await axios.get(instaApiUrl)
//                 .then(function(response) {
//                     let data = response.data.graphql.user
//
//                     result.profilePhoto = data.profile_pic_url_hd
//                     result.numFollowers = data.edge_followed_by.count
//                     result.isPrivate = data.is_private
//
//                     result.photos = []
//                     data.edge_owner_to_timeline_media.edges.slice([0], [9]).map((item, i) => {
//                         result.photos.push(item.node.display_url)
//                     });
//             })
//         } catch (err) {
//              return res.status(401).send(result).statusMessage("invalid user")
//         }
//
//         return res.status(200).send(result)
//     })
// })
//
// exports.getMediumInfo = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async () => {
//         const {mediumUser} = req.body
//         const mediumRssUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@" + mediumUser
//
//         let result = {}
//         try {
//             await fetch(mediumRssUrl)
//                 .then((response) => response.json())
//                 .then((data) => {
//                     // Filter for actual posts. Comments don't have categories, therefore can filter for items with categories larger than 0
//                     const response = data.items
//                     const posts = response.filter(item => item.categories.length > 0)
//
//                     function shortenText(text,startingPoint ,maxLength) {
//                         return text.length > maxLength?
//                         text.slice(startingPoint, maxLength):
//                         text
//                     }
// 
//                     result.publications = []
//                     posts.slice([0], [3]).map((item, i) => {
//                         let publication = {}
//                         publication.link = item.link
//                         publication.thumbnail = item.thumbnail
//                         publication.title = shortenText(item.title, 0, 30)+ '...'
//                         result.publications.push(publication)
//                 });
//             })
//         }
//         catch {
//             return res.status(401).send(result).statusMessage("invalid user")
//         }
//
//         return res.status(200).send(result)
//     })
// })
=======
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
                let yearsAgo = moment().subtract(1, "years").toISOString()
                let eventCount = 0
                response.data.forEach((event) => {
                    if (moment(event.created_at).isBetween(yearsAgo, now)) {
                        eventCount += 1
                    }
                })
                result.eventCount = eventCount
            })

        await axios.get(githubApiUrl + "repos", AUTH_HEADER)
            .then(function(response) {
                if (response.data[0]) {
                    result.repoNames = [[response.data[0].name, response.data[0].description]]
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

exports.getInstaInfo = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        const {instaUser} = req.body
        const profileUrl = "https://www.instagram.com/" + instaUser
        const instaApiUrl = profileUrl + "/?__a=1"

        let result = {}

        result.linkToProfile = profileUrl

        try {
            await axios.get(instaApiUrl)
                .then(function(response) {
                    let data = response.data.graphql.user
                    
                    result.profilePhoto = data.profile_pic_url_hd
                    result.numFollowers = data.edge_followed_by.count
                    result.isPrivate = data.is_private
                    
                    result.photos = []
                    data.edge_owner_to_timeline_media.edges.slice([0], [9]).map((item, i) => {
                        result.photos.push(item.node.display_url)
                    });
            })
        } catch (err) {
             return res.status(401).send(result).statusMessage("invalid user")
        }

        return res.status(200).send(result)
    })
})

exports.getMediumInfo = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        const {mediumUser} = req.body
        const mediumRssUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@" + mediumUser

        let result = {}
        try {
            await fetch(mediumRssUrl)
                .then((response) => response.json())
                .then((data) => {
                    // Filter for actual posts. Comments don't have categories, therefore can filter for items with categories larger than 0
                    const response = data.items 
                    const posts = response.filter(item => item.categories.length > 0) 

                    function shortenText(text,startingPoint ,maxLength) {
                        return text.length > maxLength?
                        text.slice(startingPoint, maxLength):
                        text
                    }

                    result.publications = []
                    posts.slice([0], [3]).map((item, i) => {
                        let publication = {}
                        publication.link = item.link
                        publication.thumbnail = item.thumbnail
                        publication.title = shortenText(item.title, 0, 30)+ '...'
                        result.publications.push(publication)
                });
            })
        }
        catch {
            return res.status(401).send(result).statusMessage("invalid user")
        }

        return res.status(200).send(result)
    })
})

exports.getYoutubeInfo = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        const {youtubeUser} = req.body

        const channelIdApiUrl = "https://www.googleapis.com/youtube/v3/channels?key=AIzaSyBwhjyNKWB2stpJFgG9pYHXUuV26s6U1KU&forUsername=" + youtubeUser + "&part=id"

        let result = {}
        let channelId = undefined

        console.log(channelIdApiUrl)
        try {
            await axios.get(channelIdApiUrl)
                .then(function(response) {
                    channelId = response.data.items[0].id

            })
        } catch (err) {
             return res.status(401).send(err)
        }

        try {
            let youtubeApiUrl = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBwhjyNKWB2stpJFgG9pYHXUuV26s6U1KU&channelId=" + channelId + "&part=snippet,id&maxResults=3&order=viewCount"
            await axios.get(youtubeApiUrl)
                .then(function(response) {
                    videos = response.data.items

                    video = {}
                    videos.slice([0], [3]).map((item, i) => {
                        let vidId = item.id.videoId
                        console.log(item)
                        let videoStatisticsUrl = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + vidId + "&key=AIzaSyBwhjyNKWB2stpJFgG9pYHXUuV26s6U1KU"
                        // videoCount = undefined
                        // await axios.get(videoStatisticsUrl)
                        //     .then(function(response) {
                        //         videoCount = response.data.items[0].statistics.viewCount
                        // });
                        // console.log(videoCount)
                    });
            })
        } catch (err) {
             return res.status(401).send(result).statusMessage("invalid user")
        }

        return res.status(200).send(result)
    })
})

>>>>>>> incomplete youtube api

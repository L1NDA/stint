const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const htmlToText = require('html-to-text');

const nodemailer = require("nodemailer")

const { mailConfig } = require("./config")
const { githubConfig } = require("./config")

const axios = require('axios')
const moment = require('moment');

const AUTH_HEADER = { 'headers':
                        { 'Authorization': functions.config().github.id + ":" + functions.config().github.key}
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
        const githubApiUrl = "https://api.github.com/users/" + githubUser

        let result = {}

        await axios.get(githubApiUrl)
            .then(result => {
            }).catch(err => {
                if (err.request.res.statusMessage) {
                    return res.status(404).send(result)
                }
                else {
                    return res.status(401).send(result)
                }
            });

        await axios.get(githubApiUrl + "/events")
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
            }).catch(err => {
                if (err.request.res.statusMessage) {
                    return res.status(404).send(result)
                }
                else {
                    return res.status(401).send(result)
                }
            });



        await axios.get("https://api.github.com/search/repositories?q=user:" + githubUser + "+sort:updated-desc", AUTH_HEADER)
            .then(function(response) {
                if (response.data.items[0]) {
                    result.repoNames = [[response.data.items[0].name, response.data.items[0].description, response.data.items[0].html_url]]
                }
                if (response.data.items[1]) {
                    result.repoNames.push([response.data.items[1].name, response.data.items[1].description, response.data.items[1].html_url])
                }
                if (response.data.items[2]) {
                    result.repoNames.push([response.data.items[2].name, response.data.items[2].descriptio, response.data.items[2].html_url])
                }
            }).catch(err => {
                if (err.request.res.statusMessage) {
                    return res.status(404).send(result)
                }
                else {
                    return res.status(401).send(result)
                }
            });

        await axios.get(githubApiUrl + "/orgs", AUTH_HEADER)
            .then(function(response) {
                result.orgs = []
                response.data.slice([0], [3]).map((org, i) => {
                    result.orgs.push([org.login, org.description, "https://www.github.com/" + org.login])
                })
            }).catch(err => {
                if (err.request.res.statusMessage) {
                    return res.status(404).send(result)
                }
                else {
                    return res.status(401).send(result)
                }
            });

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
            await axios.get(mediumRssUrl)
                .then(function(response) {
                        // Filter for actual posts. Comments don't have categories, therefore can filter for items with categories larger than 0
                        const res = response.data.items
                        const posts = res.filter(item => item.categories.length > 0)


                        function toText(t) {
                            text = htmlToText.fromString(t, {
                                wordwrap: 130
                            });

                            text = text.replace(/(\[.*?\])/g, '');
                            text = text.replace(/(\r\n|\n|\r)/gm, " ");
                            return text
                         }

                        function shortenText(text,startingPoint ,maxLength) {
                            return text.length > maxLength?
                            text.slice(startingPoint, maxLength) + '...' :
                            text
                        }

                        result.publications = []
                        posts.slice([0], [3]).map((item, i) => {
                            let publication = {}
                            publication.link = item.link
                            publication.pubDate = item.pubDate
                            publication.thumbnail = item.thumbnail
                            publication.description = shortenText(toText(item.description), 0, 150)
                            publication.title = shortenText(item.title, 0, 40)
                            result.publications.push(publication)
                        })
                    })
        }catch (err) {
            return res.status(401).send(result)
        }
        return res.status(200).send(result)
    })
})

// exports.getYoutubeInfo = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async () => {
//         const {youtubeUser} = req.body

//         const channelIdApiUrl = "https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&q=" + youtubeUser + "&type=channel&key=AIzaSyCzzixWsVDXAQnxu1bSq_nKxtmidbSHRl0"

//         let result = {}
//         let channelId = undefined

//         console.log(channelIdApiUrl)

//         await axios.get(channelIdApiUrl)
//             .then(function(response) {
//                 channelId = response.data.items[0].id.channelId
//         }).catch(err => {
//             console.log("hello")
//             res.status(300).send(res)
//         });

//         let youtubeApiUrl = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCzzixWsVDXAQnxu1bSq_nKxtmidbSHRl0&channelId=" + channelId + "&part=snippet,id&maxResults=3&order=viewCount"
//         console.log(youtubeApiUrl)

//         result = {}
//         await axios.get(youtubeApiUrl)
//             .then(async function(response) {
//                 videos = response.data.items
//                 console.log(videos)
//                 result.videos = []

//                 promises = []
//                 let viewCounts = videos.slice([0], [3]).map((item) => {
//                     video = {}
//                     video.title = item.snippet.title

//                     let vidId = item.id.videoId

//                     promises.push(getVideoCount(vidId))

//                 })
//                 let counts = await Promise.all(promises)
//                 console.log(counts)

//         }).catch(err => {
//             res.status(300).send(res)
//         });

//         return res.status(200).send(result)
//     })
// })

// async function getVideoCount(id) {
//     res = null
//     let videoStatisticsUrl = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + id + "&key=AIzaSyCzzixWsVDXAQnxu1bSq_nKxtmidbSHRl0"
//     await axios.get(videoStatisticsUrl)
//         .then(function(response) {
//             viewCount = response.data.items[0].statistics.viewCount
//             res = viewCount
//         }).catch(err => {
//             res.status(300).send(res)
//     });
//     return res
// }

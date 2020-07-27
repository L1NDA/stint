const { firebaseConfig } = require("./config");
const functions = require('firebase-functions');
const firebase = require('firebase')
const admin = require("firebase-admin")


firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// database.ref('freelancers').once('value', users => {
//     console.log("in script")
//     // Build an array of all records to push to Algolia
//     const updates = {};
//     users.forEach(user => {
//       // get the key and data from the snapshot
//       const childKey = user.key;
//       const childData = user.val();

//       if (childData.profile) {
//         if (childData.profile.softwareDev) {
//           let info = childData.profile.softwareDev
//           if (info.personalWebsiteUrl) {
//             childData.profile.personalWebsiteUrl = info.personalWebsiteUrl
//           }
//         }

//         if (childData.profile.design) {
//           let info = childData.profile.design
//           if (info.personalWebsiteUrl) {
//             childData.profile.personalWebsiteUrl = info.personalWebsiteUrl
//           }
//         }

//         if (childData.profile.dataAnalytics) {
//           let info = childData.profile.dataAnalytics
//           if (info.personalWebsiteUrl) {
//             childData.profile.personalWebsiteUrl = info.personalWebsiteUrl
//           }
//         }

//         if (childData.profile.contentCreation) {
//           let info = childData.profile.contentCreation
//           if (info.personalWebsiteUrl) {
//             childData.profile.personalWebsiteUrl = info.personalWebsiteUrl
//           }
//         }
//       }
      
//       updates['/freelancers/' + childKey] = childData
//     });

//     return database.ref().update(updates, function(error) {
//         if (error) {
//           console.log("no")
//         } else {
//           console.log("hello")
//     }});
// });

database.ref('freelancers').once('value', users => {
    console.log("in script")
    // Build an array of all records to push to Algolia
    const updates = {};
    users.forEach(user => {
      // get the key and data from the snapshot
      const childKey = user.key;
      const childData = user.val();

      if (childData.personalWebsiteUrl) {
        updates['/freelancers/' + childKey + '/personalWebsiteUrl'] = null
      }
    });

    console.log(updates)

    return database.ref().update(updates, function(error) {
        if (error) {
          console.log("no")
        } else {
          console.log("hello")
    }});
});

  
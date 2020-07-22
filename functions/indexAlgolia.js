const { firebaseConfig } = require("./config");
const functions = require('firebase-functions');
const firebase = require('firebase')
const algoliasearch = require('algoliasearch')
const admin = require("firebase-admin")

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

firebase.initializeApp(firebaseConfig);

const client = algoliasearch(APP_ID, ADMIN_KEY)

const database = firebase.database();


/* The index name needs to be the proper one for prod */
const index = client.initIndex("staging_users");

database.ref('freelancers').once('value', users => {
    console.log("in script")
    // Build an array of all records to push to Algolia
    const records = [];
    users.forEach(user => {
      console.log(user)
      // get the key and data from the snapshot
      const childKey = user.key;
      const childData = user.val();

      if (childData.profile) {
        if (childData.profile.softwareDev) {
          let info = childData.profile.softwareDev
          if (info.skills) {
            childData.profile.softwareDev.skillsArray = Object.keys(info.skills)
          }
        }

        if (childData.profile.design) {
          let info = childData.profile.design
          if (info.skills) {
            childData.profile.design.skillsArray = Object.keys(info.skills)
          }
        }

        if (childData.profile.dataAnalytics) {
          let info = childData.profile.dataAnalytics
          if (info.skills) {
            childData.profile.dataAnalytics.skillsArray = Object.keys(info.skills)
          }
        }

        if (childData.profile.contentCreation) {
          let info = childData.profile.contentCreation
          if (info.skills) {
            childData.profile.contentCreation.skillsArray = Object.keys(info.skills)
          }
        }
      }
      console.log(childData.profile)
      // We set the Algolia objectID as the Firebase .key
      childData.objectID = childKey;
      // Add object for indexing
      records.push(childData);

    });

    console.log("ALL RECORDS PUSHED")
    console.log(records)
  
    index
      .saveObjects(records)
      .then(() => {
        console.log('Users imported into Algolia');
      })
      .catch(error => {
        console.error('Error when importing users into Algolia', error);
        process.exit(1);
      });
  });

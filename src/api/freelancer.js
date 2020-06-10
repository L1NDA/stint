const { FREELANCER_NAME,
		FREELANCER_EMAIL,
		FREELANCER_PHONE_NUMBER,
		FREELANCER_PHOTO_URL } = require('./DB_CONSTANTS')
const firebase = require("firebase");

// Given freelancer's Google uid, returns all data associated with that freelancer
const getFreelancerInfo = async (uid) => {
	const freelancerRef = firebase.database().ref("users/" + uid)
	freelancerRef.on("value", function(snapshot) {
		return snapshot.val()
	})
}

const updateFreelancerInfo = async (uid, name=null, email=null, photoUrl=null, phoneNumber=null) => {
	const freelancerRef = firebase.database().ref("users/" + uid)
	var updatedFreelancer = {}
	if (name) {
		updatedFreelancer[FREELANCER_NAME] = name
	}
	if (email) {
		updatedFreelancer[FREELANCER_EMAIL] = email
	}
	if (photoUrl) {
		updatedFreelancer[FREELANCER_PHOTO_URL] = photoUrl
	}
	if (phoneNumber) {
		updatedFreelancer[FREELANCER_PHONE_NUMBER] = phoneNumber
	}
	freelancerRef.update(updatedFreelancer, function(error) {
		if (error) {
			console.err("Updating freelancer info failed.", error)
		}
		else {
			console.log("Successfully updated freelancer info.")
		}
	})
}

module.exports = {
	getFreelancerInfo,
	updateFreelancerInfo }

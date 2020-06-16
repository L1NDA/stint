const { FREELANCERS_REF_PATH,
		FREELANCER_NAME,
		FREELANCER_EMAIL,
		FREELANCER_PHOTO_URL } = require('./DB_CONSTANTS')
const firebase = require("firebase");

// Given freelancer's Google uid, returns all data associated with that freelancer
const getFreelancerInfo = async (uid) => {
	const freelancerRef = firebase.database().ref(FREELANCERS_REF_PATH + "/" + uid)
	freelancerRef.on("value", function(snapshot) {
		return snapshot.val()
	})
}

/*
 *	@param {string} uid: google uid to identify which user's info to update - not actually updated
 *	@param {string} name: new name to update to
 *	@param {string} email: new email to update to
 *	@param {string} photoUrl: new photoUrl to update to
 *
 *	@return {boolean} true: on success, false: on failure
 */
const updateFreelancerInfo = async (uid, name=null, email=null, photoUrl=null) => {
	const freelancerRef = firebase.database().ref(FREELANCERS_REF_PATH + "/" + uid)
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
	console.log(updatedFreelancer)
	freelancerRef.update(updatedFreelancer, function(error) {
		if (error) {
			console.err("Updating freelancer info failed.", error)
			return false
		}
		else {
			console.log("Successfully updated freelancer info.")
			return true
		}
	})
}

module.exports = {
	getFreelancerInfo,
	updateFreelancerInfo 
}

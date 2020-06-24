const { FREELANCERS_REF_PATH,
		FREELANCER_NAME,
		FREELANCER_EMAIL,
		FREELANCER_PHOTO_URL,

		FREELANCER_PROFILE,

		FREELANCER_EDUCATION,
		FREELANCER_SCHOOL,
		FREELANCER_YEAR,
		FREELANCER_MAJORS,
		FREELANCER_MINORS,
		FREELANCER_RESIDENCE_INFO,
		FREELANCER_CITY,
		FREELANCER_STATE,

		FREELANCER_WORK_EXPERIENCE,
		FREELANCER_COMPANY_ROLES,
		FREELANCER_COMPANIES,

		FREELANCER_ORG_EXPERIENCE,
		FREELANCER_ORG_ROLES,
		FREELANCER_ORG_NAMES,

		FREELANCER_DATA_ANALYTICS,
		FREELANCER_DESIGN,
		FREELANCER_CONTENT,
		FREELANCER_SOFTWARE,

		FREELANCER_SKILLS,
		FREELANCER_PERSONAL_WEBSITE,
		FREELANCER_AWARD_CATEGORIES,
		FREELANCER_AWARD_CONTENT,
		
		FREELANCER_GITHUB,
		FREELANCER_MEDIUM,
		FREELANCER_INSTAGRAM,
		FREELANCER_YOUTUBE, } = require('./DB_CONSTANTS')
const { getSignedInUser } = require("./auth.js")
const firebase = require("firebase");
// TODO: get rid of uid and instead make it return data for current signed in freelancer
// Given freelancer's Google uid, returns all data associated with that freelancer
const getFreelancerInfo = async (uid) => {
	const freelancerRef = firebase.database().ref(FREELANCERS_REF_PATH + "/" + uid)
	freelancerRef.once("value", function(snapshot) {
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
			console.error("Updating freelancer info failed.", error)
			return false
		}
		else {
			console.log("Successfully updated freelancer info.")
			return true
		}
	})
}

const setFreelancerProfile = async (year, school, majors, minors,
									cityOfResidence, stateOfResidence,
									companyRoles, companies,
									orgRoles, organizations,
									doesData, dataWebsite=null, dataSkills=null, dataAwardCategories=null, dataAwardContent=null,
									doesDesign, designWebsite=null, designSkills=null, designAwardCategories=null, designAwardContent=null,
									doesContent, mediumUrl=null, instagramUrl=null, youtubeUrl=null, contentWebsite=null, contentSkills=null, contentAwardCategories=null, contentAwardContent=null,
									doesSoftware, githubUrl=null, softwareWebsite=null, softwareSkills=null, softwareAwardCategories=null, softwareAwardContent=null) => {
	const signedInUser = await getSignedInUser()
	if (signedInUser === null) {
		return 0
	}
	var freelancerInfo = {}

	freelancerInfo[FREELANCER_EDUCATION] = {
		[FREELANCER_SCHOOL]: school,
		[FREELANCER_YEAR]: year,
		[FREELANCER_MAJORS]: majors,
		[FREELANCER_MINORS]: minors
	}
	freelancerInfo[FREELANCER_RESIDENCE_INFO] = {
		[FREELANCER_CITY]: cityOfResidence,
		[FREELANCER_STATE]: stateOfResidence
	}
	freelancerInfo[FREELANCER_WORK_EXPERIENCE] = {
		[FREELANCER_COMPANY_ROLES]: companyRoles,
		[FREELANCER_COMPANIES]: companies
	}
	freelancerInfo[FREELANCER_ORG_EXPERIENCE] = {
		[FREELANCER_ORG_ROLES]: orgRoles,
		[FREELANCER_ORG_NAMES]: organizations
	}

	if (doesData) {
		freelancerInfo[FREELANCER_DATA_ANALYTICS] = {
			[FREELANCER_PERSONAL_WEBSITE]: dataWebsite,
			[FREELANCER_SKILLS]: dataSkills,
			[FREELANCER_AWARD_CATEGORIES]: dataAwardCategories,
			[FREELANCER_AWARD_CONTENT]: dataAwardContent
		}
	}
	if (doesDesign) {
		freelancerInfo[FREELANCER_DESIGN] = {
			[FREELANCER_PERSONAL_WEBSITE]: designWebsite,
			[FREELANCER_SKILLS]: designSkills,
			[FREELANCER_AWARD_CATEGORIES]: designAwardCategories,
			[FREELANCER_AWARD_CONTENT]: designAwardContent
		}
	}
	if (doesContent) {
		freelancerInfo[FREELANCER_CONTENT] = {
			[FREELANCER_MEDIUM]: mediumUrl,
			[FREELANCER_INSTAGRAM]: instagramUrl,
			[FREELANCER_YOUTUBE]: youtubeUrl,
			[FREELANCER_PERSONAL_WEBSITE]: contentWebsite,
			[FREELANCER_SKILLS]: contentSkills,
			[FREELANCER_AWARD_CATEGORIES]: contentAwardCategories,
			[FREELANCER_AWARD_CONTENT]: contentAwardContent
		}		
	}
	if (doesSoftware) {
		freelancerInfo[FREELANCER_SOFTWARE] = {
			[FREELANCER_GITHUB]: githubUrl,
			[FREELANCER_PERSONAL_WEBSITE]: softwareWebsite,
			[FREELANCER_SKILLS]: softwareSkills,
			[FREELANCER_AWARD_CATEGORIES]: softwareAwardCategories,
			[FREELANCER_AWARD_CONTENT]: softwareAwardContent
		}
	}
	const freelancerProfileRef = firebase.database().ref(FREELANCERS_REF_PATH + "/" + signedInUser.uid + "/" + FREELANCER_PROFILE)
	freelancerProfileRef.update(freelancerInfo, function(error) {
		if (error) {
			console.error("Failed to set freelancer profile, please try again - sorry!", error)
		}
		else {
			console.log("Successfuly set freelancer profile.")
		}
	})
}

module.exports = {
	getFreelancerInfo,
	updateFreelancerInfo,
	setFreelancerProfile
}

const { COMPANIES_REF_PATH,
		COMPANY_NAME,
		COMPANY_EMAIL,
		COMPANY_INTEREST_AREAS } = require('./DB_CONSTANTS')

const firebase = require("firebase")

const setCompanyBetaInfo = (name, email, interestAreas) => {
	const companyRef = firebase.database().ref(COMPANIES_REF_PATH + "/" + name)
	companyRef.set({
		COMPANY_EMAIL: email,
		COMPANY_INTEREST_AREAS: interestAreas
	})
		
}

module.exports = {
	setCompanyBetaInfo
}

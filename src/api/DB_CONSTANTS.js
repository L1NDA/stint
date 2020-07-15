/******************************************************
FREELANCERS
JSON Structure:
{
	uid: {
		name: string
		email: string
		photoUrl: string
		profile: {
			education: {
				school: string
				year: string
				majors: list[string]
				minors: list[string]
			}
			residenceInfo: {
				city: string
				state: string
			}
			workExperience: {
				companyRoles: list[string]
				companies: list[string]
			}
			orgExperience: {
				orgRoles: list[string]
				organizations: list[string]
			}
			dataAnalytics: {}
			design: {}
			contentCreation: {}
			softwareDev: {
				githubUrl: string
				personalWebsite: string
				softwareSkills: dict[string]
				softwareAwardCategories: list[string]
				softwareAwards: list[string]
			}
		}
	}
}
*******************************************************/
const FREELANCERS_REF_PATH = "freelancers"

const FREELANCER_NAME = "name"
const FREELANCER_EMAIL = "email"
const FREELANCER_PHOTO_URL = "photoUrl"

const FREELANCER_PROFILE = "profile"

const FREELANCER_EDUCATION = "education"
const FREELANCER_SCHOOL = "school"
const FREELANCER_YEAR = "year"
const FREELANCER_MAJORS = "majors"
const FREELANCER_MINORS = "minors"

const FREELANCER_RESIDENCE_INFO = "residenceInfo"
const FREELANCER_CITY = "city"
const FREELANCER_STATE = "state"

const FREELANCER_WORK_EXPERIENCE = "workExperience"
const FREELANCER_COMPANY_ROLES = "companyRoles"
const FREELANCER_COMPANIES = "companies"
const FREELANCER_COMPANY_YEARS = "companyYears"

const FREELANCER_ORG_EXPERIENCE = "orgExperience"
const FREELANCER_ORG_ROLES = "orgRoles"
const FREELANCER_ORG_NAMES = "organizations"
const FREELANCER_ORG_YEARS = "orgYears"

const FREELANCER_DATA_ANALYTICS = "dataAnalytics"
const FREELANCER_DESIGN = "design"
const FREELANCER_CONTENT = "contentCreation"
const FREELANCER_SOFTWARE = "softwareDev"

const FREELANCER_SKILLS = "skills"
const FREELANCER_PERSONAL_WEBSITE = "personalWebsiteUrl"
const FREELANCER_AWARD_CATEGORIES = "awardCategories"
const FREELANCER_AWARD_CONTENT = "awardContent"
const FREELANCER_AWARD_PROVIDERS = "awardProviders"

const FREELANCER_GITHUB = "githubUser"
const FREELANCER_MEDIUM = "mediumUser"
const FREELANCER_INSTAGRAM = "instagramUser"
const FREELANCER_YOUTUBE = "youtubeUser"

const FREELANCER_PHONE_NUM = "phoneNum"


/******************************************************
COMPANIES
*******************************************************/

const COMPANIES_REF_PATH = "companies"

const COMPANY_NAME = "name"
const COMPANY_EMAIL = "email"
const COMPANY_INTEREST_AREAS = "interestAreas"


module.exports = {
	FREELANCERS_REF_PATH,
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
	FREELANCER_COMPANY_YEARS,

	FREELANCER_ORG_EXPERIENCE,
	FREELANCER_ORG_ROLES,
	FREELANCER_ORG_NAMES,
	FREELANCER_ORG_YEARS,

	FREELANCER_DATA_ANALYTICS,
	FREELANCER_DESIGN,
	FREELANCER_CONTENT,
	FREELANCER_SOFTWARE,

	FREELANCER_SKILLS,
	FREELANCER_PERSONAL_WEBSITE,
	FREELANCER_AWARD_CATEGORIES,
	FREELANCER_AWARD_CONTENT,
	FREELANCER_AWARD_PROVIDERS,
	
	FREELANCER_GITHUB,
	FREELANCER_MEDIUM,
	FREELANCER_INSTAGRAM,
	FREELANCER_YOUTUBE,

	FREELANCER_PHONE_NUM,

	COMPANIES_REF_PATH,
	COMPANY_NAME,
	COMPANY_EMAIL,
	COMPANY_INTEREST_AREAS
}

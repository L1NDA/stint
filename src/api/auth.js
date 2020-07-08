/******* DEPRECATED *********/
const { FREELANCERS_REF_PATH,
		FREELANCER_NAME,
		FREELANCER_EMAIL,
		FREELANCER_PHOTO_URL } = require('./DB_CONSTANTS')

const firebase = require("firebase");
const firebaseui = require("firebaseui");
const {linkedinConfig} = require("../config")

const LINKEDIN_API_URL = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78jv0jjr40mh6x&redirect_uri=https%3A%2F%2Flocalhost%3A3000%0A&scope=r_liteprofile%20r_emailaddress%20w_member_social"
const REDIRECT_URI = "https%3A%2F%2Flocalhost%3A3000%2F"

let SIGNED_IN_USER = null

const initCheckAuth = async () => {
  return await firebase.auth().onAuthStateChanged(
    (freelancer) => {
      if (freelancer) {
        // User is signed in.
        SIGNED_IN_USER = freelancer
        console.log(freelancer)
        return freelancer
      } else {
        // User is signed out.
        return null
      }
    },
    (error) => {
      console.log(error);
    }
  )
};

const getSignedInUser = async () => {
  const signedInUser = await initCheckAuth()
  console.log(signedInUser)
  return signedInUser
}

const authUi = new firebaseui.auth.AuthUI(firebase.auth());
const authUiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      const user = authResult.user
      const displayName = user.displayName;
	  const email = user.email;
	  const emailVerified = user.emailVerified;
	  const photoUrl = user.photoURL;
	  const uid = user.uid;

	  let newFreelancer = {}
	  newFreelancer[FREELANCER_NAME] = displayName
	  newFreelancer[FREELANCER_EMAIL] = email
	  newFreelancer[FREELANCER_PHOTO_URL] = photoUrl
	  const freelancerRef = firebase.database().ref(FREELANCERS_REF_PATH + "/" +uid)
	  return freelancerRef.update(newFreelancer, function(error) {
  		if (error) {
  			console.log("Error: freelancer info not updated.", error)
  		}
  		else {
  			console.log("Freelancer info updated successfully.")
  		}
  	  }).then(function() {
        console.log(SIGNED_IN_USER)
  	  	window.location.pathname = "/login=true"
  	  })
  	  return false
    },
    signInFailure: function(error) {
	    console.log("sign in failed")
	},
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "/login=true",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.

    // firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>",
};

const signOutFreelancer = async () => {
  console.log(await getSignedInUser())
	if (await getSignedInUser()) {
		firebase.auth().signOut().then(function(){
			console.log("Signed out the freelancer successfully.")
			return true
		}, function(error) {
			console.log("Sign out failed:", error)
			return false
		})
	}
	else {
		console.log("Freelancer not signed in.")
		return false
	}
}

const linkedInAuth = () => {
	const linkedinScope = ""
	var apiUrl = LINKEDIN_API_URL + "?response_type=code&client_id=" + linkedinConfig.apiId + "&redirect_uri=" + REDIRECT_URI + "&scope=" + linkedinScope
}

const linkedinCallback = (code, state, error, error_description) => {
	if (!error) {
		// TODO: Check state with already generated state in apiUrl to prevent CSRF attack
		// TODO: exchange code with LinkedIn for OAuth2.0 token 
	}
	else {
		console.err(error)
		console.err(error_description)
	}
}

module.exports =  { 
	getSignedInUser,
	authUi,
	authUiConfig,
	linkedinCallback,
	signOutFreelancer
};

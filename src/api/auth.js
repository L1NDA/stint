const { USERS_REF_PATH,
		FREELANCER_NAME,
		FREELANCER_EMAIL,
		FREELANCER_PHONE_NUMBER,
		FREELANCER_PHOTO_URL } = require('./DB_CONSTANTS')

const firebase = require("firebase");
const firebaseui = require("firebaseui");
const {linkedinConfig} = require("../config")

const LINKEDIN_API_URL = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78jv0jjr40mh6x&redirect_uri=https%3A%2F%2Flocalhost%3A3000%0A&scope=r_liteprofile%20r_emailaddress%20w_member_social"
const REDIRECT_URI = "https%3A%2F%2Flocalhost%3A3000%2F"

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
	  const photoURL = user.photoURL;
	  const uid = user.uid;
	  const phoneNumber = user.phoneNumber;
	  const providerData = user.providerData;
	  // TODO: get rid of transaction here to speed up database update
	  const userRef = firebase.database().ref(USERS_REF_PATH + "/" +uid)
	  userRef.transaction(function(current_data) {
		if (current_data === null) {
			return {
				FREELANCER_NAME: displayName,
				FREELANCER_EMAIL: email,
				FREELANCER_PHOTO_URL: photoURL,
				FREELANCER_PHONE_NUMBER: phoneNumber
			}
		}
		else {
			console.log("Email " + email + " already exists.")
			return
		}
	}, 
	function(error, committed, snapshot) {
		if (error) {
			console.log("Transaction failed abnormally!", error);
		} 
		else if (!committed) {
		  console.log("We aborted the transaction (because " + email + " already exists).");
		} 
		else {
		    console.log("Email " + email + " added!");
		}
		console.log(displayName + "'s data: ", snapshot.val());
	})
      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "/form",
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

const checkAuth = () => {
  firebase.auth().onAuthStateChanged(
    function (user) {
      if (user) {
      	console.log(user)
        // User is signed in.
        return [true, user];
      } else {
        // User is signed out.
        return [false, null];
      }
    },
    function (error) {
      console.log(error);
    }
  );
};

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

module.exports =  { authUi, authUiConfig, checkAuth, linkedinCallback };

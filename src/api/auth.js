var firebase = require("firebase");
var firebaseui = require("firebaseui");
var {linkedinConfig} = require("../config")

const LINKEDIN_API_URL = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78jv0jjr40mh6x&redirect_uri=https%3A%2F%2Flocalhost%3A3000%0A&scope=r_liteprofile%20r_emailaddress%20w_member_social"
const REDIRECT_URI = "https%3A%2F%2Flocalhost%3A3000%2F"

var authUi = new firebaseui.auth.AuthUI(firebase.auth());
var authUiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      const user = authResult.user
      var displayName = user.displayName;
	  var email = user.email;
	  var emailVerified = user.emailVerified;
	  var photoURL = user.photoURL;
	  var uid = user.uid;
	  var phoneNumber = user.phoneNumber;
	  var providerData = user.providerData;

	  var userRef = firebase.database().ref("users/"+uid)
	  userRef.transaction(function(current_data) {
		if (current_data === null) {
			return {
				name: displayName,
				email: email,
				photoUrl: photoURL,
				phoneNumber: phoneNumber
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
  signInFlow: "",
  signInSuccessUrl: "",
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
        // User is signed in.
        return [true, user]
      } else {
        // User is signed out.
        return [false, null]
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

import "../firebase"
var firebase = require("firebase");
var firebaseui = require("firebaseui");

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

const checkAuth = function () {
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

export { authUi, authUiConfig, checkAuth };

// Initialize Firebase
const config = {
  apiKey: "AIzaSyB0vzXxXH-zlCdeCgOomDUeRndfEqC-pxc",
  authDomain: "devvo-73444.firebaseapp.com",
  databaseURL: "https://devvo-73444.firebaseio.com",
  projectId: "devvo-73444",
  storageBucket: "",
  messagingSenderId: "150079749719"
};
firebase.initializeApp(config);

//Name that will be used for the authentication cookie
const authenticationCookieName = "devvo-authentication";

//function that sets cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//getting the cookie
function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie (name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function isAuthenticated() {
  const cookie = getCookie(authenticationCookieName);
  return (cookie && cookie !== "undefined") ? true : false;
}

function getUserObject() {
  return JSON.parse(getCookie(authenticationCookieName));
}

function setCookieUserObject(userInfo) {
  setCookie(authenticationCookieName, JSON.stringify(userInfo), 30);
}

//function to check authentication cookie
function checkAuthentication() {

  //Hide the profile image for now
  $("#profileImage").hide();

  if (isAuthenticated()) {
    //Get the user info from the cookie
    const userInfo = getUserObject();

    //Hide the sign in button and home link
    $("#signInButton").hide();

    //Redirect user to the calendar page
    $("#navbar-brand").click();

    if (userInfo) {
      $("#profileImage").show();
      $("#profileImage").attr("src", userInfo.profileUrl);
    }
  }
  else {
    //Show the sign in button
    $("#signInButton").show();
  }
}


//Google SignIn Authentication function
function googleSignIn() {
  const baseProvider = new firebase.auth.GoogleAuthProvider();

  //Display google signin popup
  firebase.auth().signInWithPopup(baseProvider).then(function (result) {

    const userInfo = {
      email: result.user.email,
      name: result.user.displayName,
      profileUrl: result.user.photoURL
    };

    //Create the authentication cookie. 
    setCookie(authenticationCookieName, JSON.stringify(userInfo), 30);

    //checkAuthentication function will hide or show sections and display profile picture depending on if user is logged in
    checkAuthentication();

    console.log("Success Google Account Linked");

    //Send the POST request to create the customer if they do not already exist
    $.ajax("api/users", {
      type: "POST",
      data: userInfo
    }).then(function (userId) {

      //Set the userid in the user id in the cookie
      userInfo.userId = userId;
      setCookieUserObject(userInfo);

      //Reload the screen
      window.location.reload();
    });
  }).catch(function (err) {
    console.log(err);
    console.log("Failed to connect");
  });
}
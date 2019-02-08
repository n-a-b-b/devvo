$(document).ready(function () {
  //Attaching on click function to signin button
  $("#signInButton").on("click", googleSignIn);

  //Check to see if the user is already authenticated and dispplay or hide fields. 
  checkAuthentication();

  //If the user is already authenticated then determine where to re-route them
  if (isAuthenticated()) {

    //Get the user info from the cookie
    const userInfo = getUserObject();

    //Send the GET request to get the users info from the db
    $.ajax(`api/users/${userInfo.email}`, {
      type: "GET"
    }).then(function (result) {
      if (!result.skillLevel || result.skillLevel.trim().length === 0) {
        //Route the user to the skill Level page so they can select a skill level
        window.location.href = "skillLevel";
      } else {
        //Route the user to the calendar/tasks page
        window.location.href = `calendar/${encodeURI(userInfo.userId)}`;
      }
    });    
  }
});

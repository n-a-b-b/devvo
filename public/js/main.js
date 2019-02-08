$(document).ready(function () {
  //Check to see if the user is already authenticated and dispplay or hide fields. 
  checkAuthentication();

  //Enable bootstrap popovers
  $("[data-toggle='popover']").popover();

  $(document).on("click", "#signOutButton", function() {
    deleteCookie(authenticationCookieName);
    location.href = "/";
  });
});
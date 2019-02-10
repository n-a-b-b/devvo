$(document).ready(function () {

  //Handle making the nav links active depending on the page the user is on
  if (location.pathname.toLowerCase() === "/successboard") {
    $("#sbNavListItem").addClass("active");
    $(".nav-item:not(#sbNavListItem)").removeClass("active");
  } else if (location.pathname.toLowerCase() === "/email") {
    $("#contactUsNavListItem").addClass("active");
    $(".nav-item:not(#contactUsNavListItem)").removeClass("active");
  } else {
    $("#homeNavListItem").addClass("active");
    $(".nav-item:not(#homeNavListItem)").removeClass("active");
  }

  //Check to see if the user is already authenticated and dispplay or hide fields. 
  checkAuthentication();

  //Enable bootstrap popovers
  $("[data-toggle='popover']").popover();

  $(document).on("click", "#signOutButton", function () {
    deleteCookie(authenticationCookieName);
    location.href = "/";
  });
});
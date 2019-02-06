$(document).ready(function () {

  //If the user is not authenticated then redirect to the login page
  if (!isAuthenticated()) {
    window.location.href = "/";
  }


  ///This code is a placeholder to be changed when schema is ready
  $(function() {
    var completed = setInterval(function () {
      currentProgress = 60;
      $("#dynamic")
        .css("width", currentProgress + "%")
        .attr("aria-valuenow", currentProgress)
        .text(currentProgress + "%");

    });
  });
});
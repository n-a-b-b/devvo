$(document).ready(function () {

  //If the user is not authenticated then redirect to the login page
  if (!isAuthenticated()) {
    window.location.href = "/";
  }

  $(".homeForm").on("submit", function (event) {
    //Prevent the screen from being refreshed on submit
    event.preventDefault();

    //Get the user info from the cookie
    const userInfo = getUserObject();

    //Crete the object that will contain the values we want to update
    const updatedUser = {
      skillLevel: this.skillLevel.value
    };

    //Check for errors in required fields and prevent post to API if there are errors. 
    if (this.checkValidity()) {
      //Send the PUT request to update the customer.
      $.ajax(`api/users/${userInfo.email}`, {
        type: "PUT",
        data: updatedUser
      })
        .then(function () {

          const newUserTask = {
            userId: userInfo.userId
          };

          //Associate tasks to the user by using the userTasks api POST method
          $.ajax("api/userTasks", {
            type: "POST",
            data: newUserTask
          })
            .then(function () {
              //Route the user to the calendar/tasks page
              window.location.href = `calendar/${encodeURI(userInfo.userId)}`;
            });
        });
    }

    this.classList.add("was-validated");
  });
});
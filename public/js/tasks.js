
let currentProgress = 0;


$(document).ready(function () {

  //If the user is not authenticated then redirect to the login page
  if (!isAuthenticated()) {
    window.location.href = "/";
  }
  getTasks();
  updateProgressBar();

});


function getTasks() {
  //using template literal to grab user id from userObject authentication cookie information
  let userObject = getUserObject();
  $.get(`/api/userTasks/${userObject.userId}`, function (data) {
    // console.log(data);
    let userCompletedCount = 0;
    let totalCount = 0;


    //iterating through all rows, if completed, adds to completed count
    for (var i = 0; i < data.length; i++) {

      if (data[i].completed) {
        userCompletedCount += 1;
      }
      totalCount++;
    }


    //Divides total tasks for user by tasks the user has completed, then rounds to whole number
    currentProgress = Math.round((userCompletedCount / totalCount) * 100);

    console.log(currentProgress);
    console.log(totalCount);
    console.log(userCompletedCount);
    updateProgressBar();
  });
}



$(document).on("click", ".complete", function () {
  // call the database update to complete

  //userTaskId is connected to data id of button
  var userTaskId = $(this).attr("data-id");


  $.post("/api/completeTask", { id: userTaskId });

  updateProgressBar();

  //reloads the page on click
  location.reload();
});

function updateProgressBar() {
  $("#dynamic")
    .css("width", currentProgress + "%")
    .attr("aria-valuenow", currentProgress)
    .text(currentProgress + "%");
}



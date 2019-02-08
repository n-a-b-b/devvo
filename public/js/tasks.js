
let currentProgress = 0;
let taskPercent = 0;



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
    console.log(data);
    let numberOfTasks = data.length;
    taskPercent = Math.round(100/numberOfTasks);
    
  });
}



$(document).on("click", ".complete", function () {
  // call the database update to complete

  //userTaskId is connected to data id of button
  var userTaskId = $(this).attr("data-id");
  alert(userTaskId);



  $.post("/api/completeTask", {id: userTaskId});


  currentProgress += taskPercent;
  updateProgressBar();
});

function updateProgressBar() {
  $("#dynamic")
    .css("width", currentProgress + "%")
    .attr("aria-valuenow", currentProgress)
    .text(currentProgress + "%");
}



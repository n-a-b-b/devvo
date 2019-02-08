$(document).ready(function () {

  //If the user is not authenticated then redirect to the login page
  if (!isAuthenticated()) {
    window.location.href = "/";
  }

});
var currentProgress = 0;
var taskPercent = 0;

// function calculateTaskPercent() {
//   // how ever many task need to equal  - 100%
//   // set taskPercent
// }

function getTasks() {
  $.get("/api/userTasks", function (data) {
    var numberOfTasks = data.length;
    taskPercent = Math.round(100/numberOfTasks);
    
  });
}
getTasks();


$(document).on("click", ".complete", function () {
  // call the database update to complete
  var taskId = $(this).attr("data-id");
  alert(taskId);
  // call api to update record
  // $.post('/updateTask', {taskId: taskId}, function(data){})
  currentProgress += taskPercent;
  updateProgressBar();
});

function updateProgressBar() {
  $("#dynamic")
    .css("width", currentProgress + "%")
    .attr("aria-valuenow", currentProgress)
    .text(currentProgress + "%");
}

const sound = document.createElement("audio");


sound.src = "/audio/devoyeah.mp3";
sound.volume = 1;
sound.autoPlay = false;
sound.preLoad = true;
sound.controls = true;
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

    // console.log(currentProgress);
    // console.log(totalCount);
    // console.log(userCompletedCount);
    updateProgressBar();
  });
}


$(document).on("click", ".complete", function () {
  // call the database update to complete

  //userTaskId is connected to data id of button
  var userTaskId = $(this).attr("data-id");

  const updatedUserTask = {
    completed: 1,
    dateCompleted: new Date()
  };


  //Send a put request to the api server to update the user task
  $.ajax(`/api/userTasks/${userTaskId}`, {
    type: "PUT",
    data: updatedUserTask
  })
    .then(function () {
      //Update the progress bar
      updateProgressBar();


      let playPromise = sound.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          //allows succesful click song to finish before advancing
          setTimeout(location.reload.bind(location), 4000);
        })
          .catch(error => {
            // if error, skip music wait time
            location.reload();
          });
      }


    });
});

function updateProgressBar() {
  $("#dynamic")
    .css("width", currentProgress + "%")
    .attr("aria-valuenow", currentProgress)
    .text(currentProgress + "%");
}



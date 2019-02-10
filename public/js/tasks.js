const sound = document.createElement("audio");

// Logic for date current week display
const firstWeekday = Date.today().last().sunday().toString("dddd, MMMM d");
const lastWeekday = Date.last().saturday().add(7).day().toString("dddd, MMMM d");
const currentWeek = ` ${firstWeekday} - ${lastWeekday}`;

//Completed audio clip playback
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
    return;
  }
  getTasks();
  updateProgressBar();
  populateWeek();

  //If playCompleteSound local storage variable is set to trun then play the completed sound
  const playCompletedSound = localStorage.getItem("playCompleteSound");

  if (playCompletedSound) {
    localStorage.removeItem("playCompleteSound");
    sound.play();
  }
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


$(document).on("click", ".complete", function (event) {
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

      //Card associated with button
      const associatedCard = $(event.target).data("associated-card");

      $(`#${associatedCard}`).hide("slow", function () {
        //Update the progress bar
        updateProgressBar();

        //Set local storage variable to let page know to play sound on refresh
        localStorage.setItem("playCompleteSound", 1);

        //Reload the page
        location.reload();
      });
    });
});

function updateProgressBar() {
  $("#dynamic")
    .css("width", currentProgress + "%")
    .attr("aria-valuenow", currentProgress)
    .text(currentProgress + "%");
}

function populateWeek() {
  $("#weekInfo")
    .append(currentWeek);
}

console.log(currentWeek);





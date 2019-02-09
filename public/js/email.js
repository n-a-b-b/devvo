$(document).ready(function () {

  //If the user is not authenticated then redirect to the login page
  if (!isAuthenticated()) {
    window.location.href = "/";
    return;
  }

  const userInfo = getUserObject();
  $("#from").val(userInfo.email);


  $(document).on("submit", "#emailForm", function (event) {
    event.preventDefault();

    var newEmail = {
      from: this.from.value,
      subject: this.subject.value,
      body: this.body.value
    };

    console.log(newEmail);

    $.ajax("api/email/send-email", {
      type: "POST",
      data: newEmail
    }).then(function () {
      console.log("sent new email");
    });
  });

});
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

    if (this.checkValidity()) {
      const emailFormFields = $("#emailForm :input, #emailForm :button");
      emailFormFields.prop("disabled", true);

      var newEmail = {
        from: this.from.value,
        subject: this.subject.value,
        body: this.body.value
      };

      console.log(newEmail);

      $.ajax("api/email/send-email", {
        type: "POST",
        data: newEmail
      })
        .done(function () {
          $("#emailSentModal").modal("show");
        })
        .fail(function() {
          alert("Error sending email!");
        })
        .always(function () {
          emailFormFields.prop("disabled", false);
        });
    }

    this.classList.add("was-validated");
  });

});
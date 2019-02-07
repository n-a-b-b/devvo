var db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("login");
  });

  app.get("/home", function (req, res) {
    res.render("home");
  });

  app.get("/calendar/:email", function (req, res) {
    console.log("got here");

    db.User.findOne(
      {
        where: {
          email: req.params.email
        },
        include: [{
          model: db.UserTask,
          include: db.Task
        }]
      })
      .then(function (dbUser) {
        res.render("tasks", dbUser);
      })
      .catch(err => {
        console.log(err);
        res.render("404");
      });
  });

  app.get("/tasks", function (req, res) {
    db.Task.find({}).then(function (data) {
      console.log(data);
    })
      .catch(function (err) {
        console.log(err);
      });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

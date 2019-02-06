var db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("login");
  });

  app.get("/home", function (req, res) {
    res.render("home");
  });

  app.get("/calendar/:email", function (req, res) {

    db.User.findOne(
      {
        where: {
          email: req.params.email
        }
      })
      .then(function (dbUser) {
        db.UserTask.findAll({
          where: {
            UserId: dbUser.id
          },
          include: [db.Task]
        })
          .then(function (dbUserTask) {
            const userInfo = {
              user: dbUser,
              userTasks: dbUserTask
            };

            res.render("tasks", userInfo);
          });
      })
      .catch(err => {
        console.log(err);
        res.render("404");
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

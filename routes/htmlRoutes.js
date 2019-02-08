var db = require("../models");
var Sequelize = require("sequelize");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("login");
  });

  app.get("/skillLevel", function (req, res) {
    res.render("skillLevel");
  });

  app.get("/calendar/:userId", function (req, res) {

    const options = {
      include: [{
        model: db.UserTask,
        where: {
          completed: {
            [Sequelize.Op.or]: {
              [Sequelize.Op.ne]: 1,
              [Sequelize.Op.eq]: null
            }
          }
        },
        include: db.Task
      }]
    };

    db.User.findByPk(req.params.userId, options)
      .then(function (dbUser) {

        if (dbUser && dbUser.UserTasks) {
          //Limit the user task results to the first 6
          dbUser.UserTasks.splice(6);
        }
        //Render the tasks page
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

  app.get("/successboard", function (req, res) {
    res.render("successboard");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

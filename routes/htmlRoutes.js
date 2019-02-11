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

    //Select all user tasks that are not completed
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

          //If the users skill level is beginner and there are still beginner tasks still to be completed then only return those tasks
          const beginnerTasks = dbUser.UserTasks.filter(userTask => userTask.Task.CategoryId === 5);
          if (dbUser.skillLevel === "Beginner" && beginnerTasks && beginnerTasks.length > 0) {
            dbUser.UserTasks = beginnerTasks;
          }

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

  app.get("/successboard", function (req, res) {
    res.render("successBoard");
  });
  app.get("/email", function (req, res) {
    res.render("email");
  });
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

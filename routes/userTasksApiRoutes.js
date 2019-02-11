var db = require("../models");

module.exports = function (app) {
  //Find all user tasks for the current logged in user
  //Also do left join to retrieve the corresponding task from Tasks table
 
  app.get("/api/userTasks/all", function (req, res) {
    console.log("----- all user tasks -------");
    
    //Find all the user tasks
    db.UserTask.findAll({
      include: [db.User]
    }).then(function (userTasks) { 
      res.json(userTasks);
    });
  });
 
  app.get("/api/userTasks/:id", function (req, res) {
    console.log("----- user tasks -------");
    db.UserTask.findAll({ 
      where: {
        userId: req.params.id
      },
      include: [db.Task]
    }).then(function (tasks) {
      res.json(tasks);
    });
  });

  // Create a user task for a specific user id
  app.post("/api/userTasks/", function (req, res) {
    const userId = req.body.userId;

    //Grab all tasks from the task table
    db.Task.findAll()
      .then(function (dbTask) {

        //Loop thru all the tasks and create an array of new user tasks
        const newUserTasks = [];

        dbTask.forEach(task => {

          const userTask = {
            UserId: userId,
            TaskId: task.id,
            completed: task.completed
          };

          newUserTasks.push(userTask);
        });

        //Add the tasks to the userTask table
        db.UserTask.bulkCreate(newUserTasks)
          .then(function (dbUserTasks) {
            res.json(dbUserTasks);
          });
      });


  });
  //update user task
  app.put("/api/userTasks/:id", function (req, res) {

    const updatedUserTask = {
      completed: req.body.completed,
      dateCompleted: req.body.dateCompleted
    };

    const options = {
      where: {
        id: req.params.id
      }
    };

    db.UserTask.update(updatedUserTask, options)
      .then(result => {
        //If index 0 of the result object is 0 or less (no rows updated) 
        //then return a 404 status else return a 200/success status
        if (result[0] <= 0) {
          res.status(404).send("No rows found to update!").end();
        } else {
          res.status(200).end();
        }
      })
      .catch(err => {
        //Log the error in the node console and return a 500 status
        console.log(err);
        res.status(500).send("Failed updating userTask in database");
      });
  });
};

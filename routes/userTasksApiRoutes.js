var db = require("../models");

module.exports = function (app) {
  app.get("/api/userTasks/:id", function(req, res){
    console.log("----- user tasks -------");
    db.UserTask.findAll().then(function(tasks){
      res.send(tasks);
    });
  });
  
  // Create a user tasks for a specific user id
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
            TaskId: task.id
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
};

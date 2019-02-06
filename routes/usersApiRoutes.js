var db = require("../models");

module.exports = function (app) {
  // Get all users
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  // Get user with specific email
  app.get("/api/users/:email", function (req, res) {
    db.User.findOne(
      {
        where: {
          email: req.params.email
        }
      })
      .then(function (dbUser) {
        res.json(dbUser);
      });
  });

  // Create a new user
  app.post("/api/users", function (req, res) {
    const newUser = req.body;

    //If user's email doesn't exists in the users table then create it otherwise return the existing customer
    db.User.findOrCreate({
      where: {
        email: newUser.email.trim()
      },
      // set the default properties if it doesn't exist
      defaults: {
        email: newUser.email.trim(),
        profileUrl: newUser.profileUrl,
        name: newUser.name,
        skillLevel: newUser.skillLevel
      }
    })
      .then(function (result) {
        res.json(result[0].id);
      })
      .catch(err => {
        //If there is an error then log the error in the node console
        //and return a 500 status
        console.log(err);
        res.status(500).send("Failed saving user to the database");
      });
  });

  app.put("/api/users/:email", function (req, res) {
    const updatedUser = {
      skillLevel: req.body.skillLevel
    };

    const query = {
      where: {
        email: req.params.email
      }
    };

    db.User.update(updatedUser, query)
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
        res.status(500).send("Failed updating user in database");
      });
  });
};

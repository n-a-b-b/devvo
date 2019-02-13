const taskSeeds = require("./seeds/taskSeeds");

module.exports = function(sequelize, DataTypes) {
  //Define the task table
  var Task = sequelize.define("Task", {
    title: DataTypes.STRING, 
    text: DataTypes.TEXT,
    links: DataTypes.TEXT
  });

  //Associate the tasks with categories
  Task.associate = function (models){
    Task.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });

    Task.hasMany(models.UserTask);

    //Insert the task seed data
    Task.sync().then(() => {
      Task.bulkCreate(taskSeeds, {
        ignoreDuplicates: true
      });
    });
  };

  return Task;
};



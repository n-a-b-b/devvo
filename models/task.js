module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", { 
    text: DataTypes.STRING,
    links: DataTypes.STRING, 
  });

  Task.associate = function (models){
    Task.hasMany(models.UserTask, {
      onDelete: "cascade"
    });
  };

  return Task;
};

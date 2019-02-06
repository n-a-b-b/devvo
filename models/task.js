module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    title: DataTypes.STRING, 
    text: DataTypes.STRING,
    links: DataTypes.STRING,
    category: DataTypes.INTEGER
  });

  Task.associate = function (models){
    Task.hasMany(models.UserTask, {
      onDelete: "cascade"
    });
  };

  return Task;
};

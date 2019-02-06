module.exports = function(sequelize, DataTypes) {
  var UserTask = sequelize.define("UserTask", { 
    completed: DataTypes.BOOLEAN,
    dateDue: DataTypes.DATE, 
    dateCompleted: DataTypes.DATE
  });
  
  UserTask.associate = function (models){
    UserTask.belongsTo(models.Task, {
      foreignKey: {
        allowNull: false
      }
    });

    UserTask.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return UserTask;
};


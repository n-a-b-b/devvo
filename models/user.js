module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", { 
    email: DataTypes.STRING,
    profileUrl: DataTypes.STRING, 
    name: DataTypes.STRING,
    skillLevel: DataTypes.STRING
  });
  User.associate = function (models){
    User.hasMany(models.UserTask, {
      onDelete: "cascade"
    });
  };

  User.getTopFive = function(){
    const currentDate = new Date();

    return User.findAll({
      attributes: [
        "id", 
        "name",
        [sequelize.literal("(SELECT COUNT(*) FROM UserTasks WHERE UserTasks.UserId = User.id AND UserTasks.Completed = 1)"), "completedTaskCount"],
        [sequelize.literal(`(SELECT COUNT(*) FROM UserTasks WHERE UserTasks.UserId = User.id AND UserTasks.Completed = 1 AND updatedAt > DATE_ADD(CURDATE(), INTERVAL -5 DAY))`), "yesterdayTaskCount"],
        [sequelize.literal(`(SELECT COUNT(*) FROM UserTasks WHERE UserTasks.UserId = User.id AND UserTasks.Completed = 1)`), "twoDaysAgoTaskCount"],
        [sequelize.literal(`(SELECT COUNT(*) FROM UserTasks WHERE UserTasks.UserId = User.id AND UserTasks.Completed = 1)`), "threeDaysAgoCount"],
      ],
      order: [[sequelize.literal("completedTaskCount"), "DESC"]],
      limit: 5
    });
  };
  return User;
};

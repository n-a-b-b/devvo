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

  return User;
};

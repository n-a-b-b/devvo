module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", { 
    email: DataTypes.STRING,
    profile_url: DataTypes.STRING, 
    name: DataTypes.STRING,
    skill_level: DataTypes.STRING
  });
  User.associate = function (models){
    User.hasMany(models.UserTask, {
      onDelete: "cascade"
    });
  };

  return User;
};

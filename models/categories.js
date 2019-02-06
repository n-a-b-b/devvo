module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Category", { 
    name: DataTypes.STRING
  });

  Categories.associate = function (models){
    Categories.hasMany(models.Task, {
      onDelete: "cascade"
    });
  };

  return Categories;
};

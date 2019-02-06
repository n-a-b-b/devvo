module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", { 
    name: DataTypes.STRING
  });

  Categories.associate = function (models){
    Categories.hasMany(models.Task, {
      onDelete: "cascade"
    });
  };
  
  Categories.sync().then(() => {
    Categories.create({
    name: "Articles"
    });
    Categories.create({
    name: "Exercises"
    });
    Categories.create({
    name: "Videos"
    });
    Categories.create({
    name: "Networking"
    });
    });
    
  return Categories;
};


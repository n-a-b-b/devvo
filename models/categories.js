module.exports = function (sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    name: DataTypes.STRING
  });


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


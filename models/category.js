const categorySeeds = require("./seeds/categorySeeds");

module.exports = function (sequelize, DataTypes) {
  //Define the categories table
  var Category = sequelize.define("Category", {
    name: DataTypes.STRING
  });

  Category.associate = function (models) {
    // Associating Category with Tasks
    // When a Category is deleted, also delete any associated Tasks
    Category.hasMany(models.Task, {
      onDelete: "cascade"
    });
  };

  //Insert category seed data
  Category.sync().then(() => {
    Category.bulkCreate(categorySeeds, {
      ignoreDuplicates: true
    });
  });

  return Category;
};


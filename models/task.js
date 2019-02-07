module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    title: DataTypes.STRING, 
    text: DataTypes.TEXT,
    links: DataTypes.TEXT
  });

  Task.associate = function (models){
    Task.belongsTo(models.Categories, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};



module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    title: DataTypes.STRING, 
    text: DataTypes.STRING,
    links: DataTypes.STRING,
    catId: DataTypes.INTEGER
  });

  Task.associate = function (models){
    Task.hasMany(models.UserTask, {
      onDelete: "cascade"
    });
  };
  Task.associate = function (models){
    Task.belongsTo(models.Categories, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Task.sync().then(() => {
    Task.create({
      title: "Employer Competitive",
      text: "Review Employer Ready Vs. Employer Competitive Handout",
      links: "<a href='https://drive.google.com/file/d/0BwhzeIUMYf1nV2JQcGdkU3ktcnFBLUZ4X09VSXliTUtJZWsw/view' target='_blank'>Employer Ready Vs. Employer Competitive</a>",
      catId: 1
    });
    Task.create({
      title: "Brand Yourself",
      text: "Develop a short brand statement for yourself. Use this guide as a resource",
      links: "<a href='https://docs.google.com/document/d/1YbihkYmOu3boCu1j-myd6bVWE4l8CA6C4ka3cJ5opfk/edit' target='_blank'>Brand Statement</a>",
      catId: 2
    });
    // Task.create({
    // title: '',
    // text: ,
    // links: 0,
    // categoryId:
    // });
    // Task.create({
    // title: '',
    // text: ,
    // links: 0,
    // categoryId:
    // });

 
  });
  return Task;
};



const { Model, DataTypes } = require('sequelize');

class Project extends Model {
   static init(sequelize){
      super.init({
         title: DataTypes.STRING,
         description: DataTypes.STRING,
         completion_date: DataTypes.DATE,
         status: DataTypes.INTEGER
      }, {
         sequelize,
      });
   };

   static associate(models){
      this.belongsTo(models.User, { foreignKey: 'sub_fk', as: 'sub' });
      this.hasMany(models.Task, {foreignKey: 'project_id', as: 'tasks'});
   };
}

module.exports = Project;

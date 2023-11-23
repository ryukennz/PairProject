'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Schedule.belongsToMany(models.User, {
      //   through : 'Lectures',
      //   foreignKey : 'ScheduleId'
      // }),
      Schedule.belongsTo(models.Course)
      Schedule.hasMany(models.Lecture)
    }
  }
  Schedule.init({
    scedule: DataTypes.STRING,
    CourseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};
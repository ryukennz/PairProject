'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lecture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lecture.belongsTo(models.User)
      Lecture.belongsTo(models.Schedule)
    }
  }
  Lecture.init({
    ScheduleId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lecture',
  });
  return Lecture;
};
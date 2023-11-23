'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasMany(models.Schedule, {foreignKey : 'CourseId'})
    }
  }
  Course.init({
    course: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
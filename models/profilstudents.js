'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfilStudents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProfilStudents.belongsTo(models.User)
    }

    get fullName() {
      return `${this.firstName} ${this.lastName}`
    }

    static async getTotalStudent(){
      try {
        return ProfilStudents.findAll({
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'total']
            // [sequelize.fn('max', sequelize.col('id')), 'max'],
            // [sequelize.fn('min', sequelize.col('id')), 'min']
          ]
        })
      } catch (error) {
        throw error
      }
    }

    
    
  }
  ProfilStudents.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    bornYear: DataTypes.DATE,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    profilePicture : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProfilStudents',
  });
  return ProfilStudents;
};
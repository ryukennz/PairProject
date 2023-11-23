'use strict';
const {
  Model
} = require('sequelize');
const {hasPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.belongsToMany(models.Lecture,{
      //   through : 'Lectures',
      //   foreignKey : 'UserId'
      // }),
      User.hasMany(models.Lecture)
      User.hasOne(models.ProfilStudents)
    }

    get fullName() {
      return `${this.firstName} ${this.lastName}`
    }

  }
  User.init({
    firstName: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'FirstName is Required'
        },
        notNull : {
          msg : 'FirstName is Required'
        }
      }
    },
    lastName: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'LastName is Required'
        },
        notNull : {
          msg : 'LastName is Required'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Email is Required'
        },
        notNull : {
          msg : 'Email is Required'
        },
        len: {
          args: [[2,10]],
          msg: "The password length should be between 2 and 10 characters."
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Password is Required'
        },
        notNull : {
          msg : 'Password is Required'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.role = 'student',
        user.password = hasPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
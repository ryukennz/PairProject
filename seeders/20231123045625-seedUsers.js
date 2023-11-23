'use strict';
const fs = require('fs')
const {hasPassword} = require('../helpers/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const dataUser = JSON.parse(fs.readFileSync('./data/teachers.json', 'utf-8'))
    dataUser.forEach(el => {
       delete el.id
       el.createdAt = new Date()
       el.updatedAt = new Date()
       el.password = hasPassword(el.password)
    });
    await queryInterface.bulkInsert('Users', dataUser, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};

'use strict';
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: "john_doe",
        email: "john_doe@example.com",
        password: await bcrypt.hash("123", 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: "abrar",
        email: "abrar@example.com",
        password: await bcrypt.hash("123", 10),
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

'use strict';
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        "user_id": 1,
        "product_id": 1,
        "quantity": 2,
        "total_price": 51.98,
        "order_date": new Date(),
        "created_at": new Date()
      },
      {
        "user_id": 2,
        "product_id": 2,
        "quantity": 1,
        "total_price": 45.50,
        "order_date": new Date(),
        "created_at": new Date()
      },
      {
        "user_id": 1,
        "product_id": 3,
        "quantity": 1,
        "total_price": 120.00,
        "order_date": new Date(),
        "created_at": new Date()
      },
      {
        "user_id": 1,
        "product_id": 4,
        "quantity": 3,
        "total_price": 47.25,
        "order_date": new Date(),
        "created_at": new Date()
      },
      {
        "user_id": 1,
        "product_id": 5,
        "quantity": 2,
        "total_price": 121.98,
        "order_date": new Date(),
        "created_at": new Date()
      },
      {
        "user_id": 2,
        "product_id": 6,
        "quantity": 1,
        "total_price": 79.99,
        "order_date": new Date(),
        "created_at": new Date()
      },
      {
        "user_id": 2,
        "product_id": 7,
        "quantity": 2,
        "total_price": 71.98,
        "order_date": new Date(),
        "created_at": new Date()
      },
      {
        "user_id": 1,
        "product_id": 8,
        "quantity": 4,
        "total_price": 89.96,
        "order_date": new Date(),
        "created_at": new Date()
      },
      {
        "user_id": 1,
        "product_id": 9,
        "quantity": 1,
        "total_price": 99.95,
        "order_date": new Date(),
        "created_at": new Date()
      },
      {
        "user_id": 2,
        "product_id": 10,
        "quantity": 3,
        "total_price": 56.97,
        "order_date": new Date(),
        "created_at": new Date()
      }
    ]
      , {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};

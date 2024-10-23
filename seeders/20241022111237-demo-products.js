'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Products', [
      {
        "name": "Wireless Mouse",
        "category": "Electronics",
        "price": 25.99,
        "created_at": new Date(),
        "updated_at": new Date()
      },
      {
        "name": "Bluetooth Speaker",
        "category": "Electronics",
        "price": 45.50,
        "created_at": new Date(),
        "updated_at": new Date()
      },
      {
        "name": "Office Chair",
        "category": "Furniture",
        "price": 120.00,
        "created_at": new Date(),
        "updated_at": new Date()
      },
      {
        "name": "Water Bottle",
        "category": "Accessories",
        "price": 15.75,
        "created_at": new Date(),
        "updated_at": new Date()
      },
      {
        "name": "Running Shoes",
        "category": "Apparel",
        "price": 60.99,
        "created_at": new Date(),
        "updated_at": new Date()
      },
      {
        "name": "Gaming Keyboard",
        "category": "Electronics",
        "price": 79.99,
        "created_at": new Date(),
        "updated_at": new Date()
      },
      {
        "name": "Laptop Stand",
        "category": "Office Supplies",
        "price": 35.99,
        "created_at": new Date(),
        "updated_at": new Date()
      },
      {
        "name": "Yoga Mat",
        "category": "Fitness",
        "price": 22.49,
        "created_at": new Date(),
        "updated_at": new Date()
      },
      {
        "name": "Coffee Maker",
        "category": "Kitchen Appliances",
        "price": 99.95,
        "created_at": new Date(),
        "updated_at": new Date()
      },
      {
        "name": "Sunglasses",
        "category": "Accessories",
        "price": 18.99,
        "created_at": new Date(),
        "updated_at": new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {

    return await queryInterface.bulkDelete('Products', null, {});
  }
};

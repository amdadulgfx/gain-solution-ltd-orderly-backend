'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // await queryInterface.bulkInsert('Products', [
    //   {
    //     "name": "Wireless Mouse",
    //     "category": "Electronics",
    //     "price": 25.99,
    //     "created_at": new Date(),
    //     "updated_at": new Date()
    //   },
    //   {
    //     "name": "Bluetooth Speaker",
    //     "category": "Electronics",
    //     "price": 45.50,
    //     "created_at": new Date(),
    //     "updated_at": new Date()
    //   },
    //   {
    //     "name": "Office Chair",
    //     "category": "Furniture",
    //     "price": 120.00,
    //     "created_at": new Date(),
    //     "updated_at": new Date()
    //   },
    //   {
    //     "name": "Water Bottle",
    //     "category": "Accessories",
    //     "price": 15.75,
    //     "created_at": new Date(),
    //     "updated_at": new Date()
    //   },
    //   {
    //     "name": "Running Shoes",
    //     "category": "Apparel",
    //     "price": 60.99,
    //     "created_at": new Date(),
    //     "updated_at": new Date()
    //   },
    //   {
    //     "name": "Gaming Keyboard",
    //     "category": "Electronics",
    //     "price": 79.99,
    //     "created_at": new Date(),
    //     "updated_at": new Date()
    //   },
    //   {
    //     "name": "Laptop Stand",
    //     "category": "Office Supplies",
    //     "price": 35.99,
    //     "created_at": new Date(),
    //     "updated_at": new Date()
    //   },
    //   {
    //     "name": "Yoga Mat",
    //     "category": "Fitness",
    //     "price": 22.49,
    //     "created_at": new Date(),
    //     "updated_at": new Date()
    //   },
    //   {
    //     "name": "Coffee Maker",
    //     "category": "Kitchen Appliances",
    //     "price": 99.95,
    //     "created_at": new Date(),
    //     "updated_at": new Date()
    //   },
    //   {
    //     "name": "Sunglasses",
    //     "category": "Accessories",
    //     "price": 18.99,
    //     "created_at": new Date(),
    //     "updated_at": new Date()
    //   }
    // ]);
    await queryInterface.sequelize.query(`
      INSERT INTO "Products" (name, category, price, created_at, updated_at)
      SELECT
          'Product ' || s::text AS name,
          CASE 
              WHEN s % 5 = 0 THEN 'Category A'
              WHEN s % 5 = 1 THEN 'Category B'
              WHEN s % 5 = 2 THEN 'Category C'
              WHEN s % 5 = 3 THEN 'Category D'
              ELSE 'Category E'
          END AS category,
          round(CAST(random() * 100 + 1 AS numeric), 2) AS price,
          NOW() - (s * interval '1 day') AS created_at,
          NOW() - (s * interval '1 day') AS updated_at
      FROM generate_series(1, 100000) AS s;
    `);

  },

  async down(queryInterface, Sequelize) {

    return await queryInterface.bulkDelete('Products', null, {});
  }
};

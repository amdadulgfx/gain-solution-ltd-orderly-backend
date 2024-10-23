'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id:{
            type:  DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        price: DataTypes.DECIMAL(10, 2),
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
          }
    }, {
        timestamps: true,
    });

    return Product;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        user_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        total_price: DataTypes.DECIMAL(10, 2),
        order_date: DataTypes.DATE,
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            allowNull: false
        }
    }, {
        timestamps: true
    });

    Order.associate=function(models){
        //Many orders belong to one user
        models.Order.belongsTo(models.User, {as: 'user', foreignKey: 'user_id'});

        //Many orders belong to one product
        models.Order.belongsTo(models.Product, {as: 'product', foreignKey: 'product_id'});
    }

    return Order;
};
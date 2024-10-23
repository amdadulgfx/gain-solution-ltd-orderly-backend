'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "incorrect email format"
                }
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        password: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',  // Map the createdAt field to created_at in the database
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
        timestamps: true
    });

    return User;
};
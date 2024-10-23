'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const typeDefs = [];

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-8) === '.graphql');
    })
    .forEach(file => {
        typeDefs.push(fs.readFileSync(path.join(__dirname, file), { encoding: 'utf-8' }));
    });


module.exports = typeDefs;
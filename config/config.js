require('dotenv').config()
const dbDetails = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    // pool: {
    //     max: 50,
    //     min: 5,
    //     acquire: 30000,
    //     idle: 2000
    // },
    logging: process.env.NODE_ENV === 'production' ? false : console.log,
}

if (process.env.NODE_ENV === "production") {
    dbDetails.logging = false;
}

module.exports = {
    development: dbDetails,
    production: dbDetails
}
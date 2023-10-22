require('dotenv').config();
const fs = require('fs');
module.exports  = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOSTNAME,
        "dialect": process.env.DB_DIALECT,
        "dialectOptions": {
          ssl: {
              require: true,
              rejectUnauthorized: false
          }
       },
      },
      "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOSTNAME,
        "dialect": process.env.DB_DIALECT
      },
      "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOSTNAME,
        "dialect": process.env.DB_DIALECT
      }    
}
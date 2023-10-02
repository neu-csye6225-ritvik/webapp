// import {app } from './app/app.js';

const app = require('./app/app.js');
require('dotenv').config();
const fs = require('fs');
const {sequelize} = require('./models');
const { Sequelize } = require('sequelize');

const UserModel = require('./models/user');

// const logger = require('./logger')
const winston = require('winston');
const healthRouter = require('./app/route/route-health.js');

const port = 7799;


async function main() {
    await sequelize.authenticate();
    await sequelize.sync({});
}

// const User = UserModel(sequelize,Sequelize);

// async function bootstrapDatabase() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection to the database has been established successfully.');

//         await sequelize.sync(); // Sync the models with the database to create tables if they don't exist

//         const csvFilePath = 'opt/users.csv';
//         const csvData = fs.readFileSync(csvFilePath, 'utf-8').split('\n');
//         console.log(csvData);
//         const numberOfRows = csvData.length;
//         for (let i = 1; i < numberOfRows - 1; i++) {
//             const row = csvData[i];
//             const [first_name, last_name, email, password] = row.split(','); // Assuming the CSV has a single column 'name'
//             await User.create({first_name, last_name, email, password, account_created: new Date().toISOString(), account_updated: new Date().toISOString() });
//         }
//         // await Assignment.create({name, points, num_of_attempts, deadline, assignment_created, assignment_updated});
//         console.log('Database bootstrapped successfully.');
//     } catch (error) {
//         console.error('Error bootstrapping the database:', error);
//     } finally {
//         await sequelize.close(); // Close the database connection when done
//     }
// }

// bootstrapDatabase();



app.listen(port,() => console.log(`Server is listening at ${port}`));


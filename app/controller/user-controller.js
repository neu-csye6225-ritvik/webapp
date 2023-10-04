const response = require('express');
const fs = require('fs');
const { sequelize } = require('../../models');
const { Sequelize } = require('sequelize');
const UserModel = require("../../models/user");


const User = UserModel(sequelize, Sequelize);

var userController = {};

userController.createUser = async function () {
  try {
    console.log('Connection to the database has been established successfully.');

    const csvFilePath = 'opt/users.csv';
    const csvData = fs.readFileSync(csvFilePath, 'utf-8').split('\n');
    console.log(csvData);
    const numberOfRows = csvData.length;

    for (let i = 1; i < numberOfRows - 1; i++) {
      const row = csvData[i];
      const [first_name, last_name, email, password] = row.split(',');

      // Check if the email already exists in the database
      const existingUser = await User.findOne({ where: { email } });

      if (!existingUser) {
        // Create the user if the email doesn't exist
        await User.create({
          first_name,
          last_name,
          email,
          password
        });
        console.log(`User with email ${email} created.`);
      } else {
        console.log(`User with email ${email} already exists.`);
      }
    }

    console.log('Database bootstrapped successfully.');
  } catch (error) {
    console.error('Error bootstrapping the database:', error);
  }
};

module.exports = userController;

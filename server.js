// import {app } from './app/app.js';

const app = require('./app/app.js');
require('dotenv').config();
const fs = require('fs');
const {sequelize} = require('./models');
const { Sequelize } = require('sequelize');

const UserModel = require('./models/user');

const AssignmentModel = require('./models/assignment');
// const logger = require('./logger')
const winston = require('winston');
const healthRouter = require('./app/route/route-health.js');
const userController = require('./app/controller/user-controller.js');

const port = process.env.APP_PORT;


const User = UserModel(sequelize,Sequelize);
const Assignment = AssignmentModel(sequelize, Sequelize);


User.hasMany(Assignment, { foreignKey: 'UserId' });
Assignment.belongsTo(User, { foreignKey: 'UserId' });


async function main() {
    await sequelize.authenticate();
    await sequelize.sync({alter:true})
                   .then(//create users
                    (userCreate) => {
                     userController.createUser()
                    }
                   );
}

// app.listen(port,() => console.log(`Server is listening at ${port}`));
main();

app.listen(port,async()=>{
      console.log("App started on: " + port)
    //   main();
    })

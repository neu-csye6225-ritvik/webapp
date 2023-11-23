// import {app } from './app/app.js';

const app = require('./app/app.js');
require('dotenv').config();
const fs = require('fs');
const {sequelize} = require('./models');
const { Sequelize } = require('sequelize');

const UserModel = require('./models/user');

const AssignmentModel = require('./models/assignment');
const SubmissionModel = require('./models/submission.js');
// const logger = require('./logger')
const winston = require('winston');
const healthRouter = require('./app/route/route-health.js');
const userController = require('./app/controller/user-controller.js');
const logger = require('./config/logger.js');

const port = process.env.APP_PORT;

const User = UserModel(sequelize,Sequelize);
const Assignment = AssignmentModel(sequelize, Sequelize);
const Submission = SubmissionModel(sequelize, Sequelize);


// User.hasMany(Assignment, { foreignKey: 'user_id' });

Assignment.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Submission.belongsTo(Assignment, { foreignKey: 'assignment_id', onDelete: 'CASCADE' });

// User.hasMany(Assignment,{foreignKey:{name :"userId"},onDelete:"CASCADE",field:"userId",allowNull:false})

async function main() {
    await sequelize.authenticate();
    logger.info("Connecting to database URL: " + sequelize.config.host );
    await sequelize.sync({alter:true})
                   .then(//create users
                    (userCreate) => {
                     userController.createUser()
                    }
                   )
                   .then(logger.info("users created"));
}
main();

app.listen(port,async()=>{
  logger.info(`App started on port: ${port}`)
      console.log("App started on: " + port)
    //   main();
    })


require('dotenv').config();
const express = require("express");
const cors = require("cors");
const route =  require("./route/index.js");

const {sequelize} = require('../models');

const fs =require('fs');
var healthRouter = require('./route/route-health.js');
const userController = require('./controller/user-controller.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

route(app);

//create users
userController.createUser();

module.exports = app;

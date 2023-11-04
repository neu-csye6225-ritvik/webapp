
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const route =  require("./route/index.js");
const statsdMiddleware = require('./middleware/stasd-middle.js');

const fs =require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(statsdMiddleware.reqCounter);
app.use(statsdMiddleware.reqTimer);
app.use(statsdMiddleware.responseCodeCounter);

route(app);

module.exports = app;

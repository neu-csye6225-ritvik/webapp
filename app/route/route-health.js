const express = require("express");
const healthController = require("../controller/contr-health.js");

const healthRouter = express.Router();

healthRouter.all('', [healthController.handleHealthRequest]);

module.exports = healthRouter;
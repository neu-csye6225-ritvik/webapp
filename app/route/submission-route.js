const express = require("express");
const submissionController = require("../controller/submission-controller.js");
const assignController = require("../controller/assign-controller.js");
const validation = require('../service/validation.js')

const submissionRouter = express.Router();

submissionRouter.post('/:id/submission', [validation.queryParams,assignController.authenticateUser,submissionController.createSubmission]);
submissionRouter.get('/:id/submission', [validation.queryParams,submissionController.getSubmission]);

module.exports = submissionRouter;
const express = require("express");
const assignController = require("../controller/assign-controller.js");

const assignRouter = express.Router();

assignRouter.get('', [assignController.authenticateUser,assignController.getAssignments]);
assignRouter.get('/:id', [ assignController.authenticateUser,assignController.getAssignment]);
assignRouter.post('', [assignController.authenticateUser,assignController.createAssignments]);
assignRouter.put('/:id', [assignController.authenticateUser,assignController.updateAssignment]);
assignRouter.delete('/:id', [assignController.authenticateUser,assignController.deleteAssignment]);

module.exports = assignRouter;
const express = require("express");
const assignController = require("../controller/assign-controller.js");
const validation = require('../service/validation.js')

const assignRouter = express.Router();

assignRouter.get('', [validation.rejectPayload,assignController.authenticateUser,assignController.getAssignments]);
assignRouter.get('/:id', [validation.rejectPayload, assignController.authenticateUser,assignController.getAssignment]);
assignRouter.post('', [validation.queryParams,assignController.authenticateUser,assignController.createAssignments]);
assignRouter.patch('', [validation.patchmethod]);
assignRouter.put('/:id', [validation.queryParams,assignController.authenticateUser,assignController.updateAssignment]);
assignRouter.delete('/:id', [validation.rejectPayload,assignController.authenticateUser,assignController.deleteAssignment]);


module.exports = assignRouter;
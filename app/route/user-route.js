const express = require("express");
const userController = require("../controller/user-controller.js");

const userRouter = express.Router();

userRouter.post('', [userController.createUser]);

module.exports = userRouter;
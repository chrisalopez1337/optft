const express = require('express');
const userRouter = express.Router();
const controllers = require('../controllers/userControllers.js');

userRouter.post('/create', controllers.createUser);

module.exports = userRouter;

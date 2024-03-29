const express = require('express');
const userRouter = express.Router();
const controllers = require('../controllers/userControllers.js');
const mailController = require('../controllers/mailer.js');

userRouter.post('/create', controllers.createUser);
userRouter.get('/:searchItem', controllers.getUser);
userRouter.post('/validate', controllers.validateUser);
// These are for recovery
userRouter.post('/recovery/send-recovery-email', mailController.sendRecoveryEmail);
userRouter.post('/recovery/verify-hash', mailController.verifyHash);
userRouter.post('/recovery/change-password', mailController.updatePassword);

module.exports = userRouter;

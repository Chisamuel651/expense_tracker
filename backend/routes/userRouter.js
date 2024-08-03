const express = require('express');
const usersController = require('../controllers/usersController');

const userRouter = express.Router();
userRouter.post('/api/v1/users/register', usersController.register);

module.exports = userRouter;
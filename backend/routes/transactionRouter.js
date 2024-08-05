const express = require('express');
const transactionsController = require('../controllers/transactionsController');
// protect the user profile
const isAuthenticated = require('../middlewares/isAuth');

const transactionRouter = express.Router();
//! create
transactionRouter.post(
    '/api/v1/transactions/create', 
    isAuthenticated,
    transactionsController.create
);
//! read
// transactionRouter.get(
//     '/api/v1/transactions/lists', 
//     isAuthenticated,
//     transactionsController.lists
// );
//! filterTransaction
transactionRouter.get(
    '/api/v1/transactions/lists', 
    isAuthenticated,
    transactionsController.getFilteredTransactions
);


module.exports = transactionRouter;
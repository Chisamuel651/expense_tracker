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
//! read and filterTransaction
transactionRouter.get(
    '/api/v1/transactions/lists', 
    isAuthenticated,
    transactionsController.getFilteredTransactions
);
//! update
transactionRouter.put(
    '/api/v1/transactions/update/:id', 
    isAuthenticated,
    transactionsController.update
);
//! delete
transactionRouter.delete(
    '/api/v1/transactions/delete/:id', 
    isAuthenticated,
    transactionsController.delete
);


module.exports = transactionRouter;
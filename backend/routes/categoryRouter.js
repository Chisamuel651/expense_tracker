const express = require('express');
const categoriesController = require('../controllers/categoriesController');
// protect the user profile
const isAuthenticated = require('../middlewares/isAuth');

const categoryRouter = express.Router();
//! create
categoryRouter.post(
    '/api/v1/categories/create', 
    isAuthenticated,
    categoriesController.create
);
//! read
categoryRouter.get(
    '/api/v1/categories/lists', 
    isAuthenticated,
    categoriesController.lists
);


module.exports = categoryRouter;
const asyncHandler = require('express-async-handler');
const Category = require('../model/Category');


const categoriesController = {
    //!addCategory
    create: asyncHandler(async (req, res) => {
        const {name, type } = req.body;
        if(!name || !type){
            throw new Error('Name and type are required for creating a category');
        }
        // convert the name to lowercase
        const normalizedName = name.toLowerCase();
        //! check if the type is valid
        const validTypes = ['income','expense'];
        // return custom error message
        if(!validTypes.includes(type.toLowerCase())){
            throw new Error('Invalid category type' + type);
        }
        //! check if category already exists on the user acc
        const categoryExists = await Category.findOne({ 
            name: normalizedName, 
            user: req.user,
        });
        if(categoryExists){
            throw new Error(
                `Category ${categoryExists.name} already exists!`
            );
        }
        //! otherwise create
        const category = await Category.create({
            name: normalizedName,
            user: req.user,
            type,
        });
        res.status(201).json(category);
    }),
    
    //!readCategory
    lists: asyncHandler(async (req, res) => {
        const categories = await Category.find({user: req.user});
        res.status(200).json(categories);
    }),

    //!updateCategory
    update: asyncHandler(async (req, res) => {
    }),

    //! deleteCategory
    delete: asyncHandler(async (req, res) => {
    }),
};

module.exports = categoriesController;
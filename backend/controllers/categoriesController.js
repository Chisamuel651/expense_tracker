const asyncHandler = require('express-async-handler');
const Category = require('../model/Category');
const Transaction = require('../model/Transaction');


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
        const {id: categoryId} = req.params;
        const { name } = req.body;
        const normalizedName = name.toLowerCase();
        const category = await Category.findById(categoryId);
        if(!category || category.user.toString() !== req.user.toString()){
            throw new Error('Category not found or user not authorized');
        }
        //! update transaction category
        const oldName = category.name;
        category.name = normalizedName;
        // category.type = name;
        const updatedCategory = await category.save();
        // update transaction
        if(oldName !== updatedCategory){
            await Transaction.updateMany(
                {
                    user: req.user,
                    category: oldName,
                },{
                    $set:{category: updatedCategory.name}
                }
            );
        }
        res.json(updatedCategory);
    }),

    //! deleteCategory
    delete: asyncHandler(async (req, res) => {
        const category = await Category.findById(req.params.id);
        if(category && category.user.toString() === req.user.toString()){
            //! update transactions that have this category
            const defaultCategory = 'Uncategorized';
            await Transaction.updateMany({
                user: req.user, category: category.name
            },
            {
                $set:{category: defaultCategory}
            }
        );
        // remove category
        await Category.findByIdAndDelete(req.params.id);
        res.json({message: 'Category has been removed and transaction updated'})
        }else{
            res.json({message: 'User not authorized'});
        }
    }),
};

module.exports = categoriesController;
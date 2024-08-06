const asyncHandler = require('express-async-handler');
const Transaction = require('../model/Transaction');


const transactionsController = {
    //!addTransaction
    create: asyncHandler(async (req, res) => {
        const { type, category, amount, date, description } = req.body;
        if(!amount || !type|| !date){
            throw new Error('Type amount and date are required for creating a category');
        }
        //! create
        const transaction = await Transaction.create({
            user: req.user,
            type,
            category,
            amount,
            description
        });

        res.status(201).json(transaction);
    }),
    
    //!filterTransaction
    getFilteredTransactions: asyncHandler(async (req, res) => {
        const { startDate, endDate, type, category } = req.query
        let filters = { user: req.user };
        if(startDate){
            filters.date = { ...filters.date, $gte: new Date(startDate) }
        }
        if(endDate){
            filters.date = { ...filters.date, $lte: new Date(endDate) }
        }
        if(type){
            filters.type = type;
        }
        if(category){
            if(category === 'All'){
                //! no category filtered

            }else if(category === 'Uncategorized'){
                //! filter transactions that are uncategorized
                filters.category = 'Uncategorized'
            }else {
                filters.category = category;
            }
        }

        const transactions = await Transaction.find(filters).sort({ date: -1 })
        res.json(transactions);
    }),

    //!updateTransaction
    update: asyncHandler(async (req, res) => {
        //! find transaction by id
        const transaction = await Transaction.findById(req.params.id);
        if(transaction && transaction.user.toString() === req.user.toString()){
            transaction.category = req.body.category || transaction.category;
            transaction.amount = req.body.amount || transaction.amount;
            transaction.date = req.body.date || transaction.date;
            transaction.description = req.body.description || transaction.description;

            // update
            const updatedTransaction = await transaction.save();
            res.json(updatedTransaction)
        }
    }),

    //! deleteTransaction
    delete: asyncHandler(async (req, res) => {
        //! find transaction by id
        const transaction = await Transaction.findById(req.params.id);
        if(transaction && transaction.user.toString() === req.user.toString()){
            await Transaction.findByIdAndDelete(req.params.id);
            res.json({ message: 'Transaction deleted!' })
        }
    }),
};

module.exports = transactionsController;
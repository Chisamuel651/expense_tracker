const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/userRouter');
const app = express();

const uri = process.env.MONGODB_URI;

//! Connect to mongodb
mongoose.connect(uri).then(() => console.log('DB is connected')).catch((e) => console.log(e));

    //! Middlewares
    app.use(express.json()) //? pass incoming data
//! Routes
app.use('/', userRouter);

//! Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => 
    console.log(`server running on ${PORT}`)
)
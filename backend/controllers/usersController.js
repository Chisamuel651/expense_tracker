const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

//! user Registration
// exporting my controllers as an object
const usersController = {
    //!Register
    register: asyncHandler(async (req, res) => {
        const {username, email, password} = req.body;
    
        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }
    
        // Hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Create user and save to db
        const userCreated = await User.create({
            email,
            username,
            password: hashedPassword, // Save the hashed password
        });
    
        // Send the user information
        res.status(201).json({
            username: userCreated.username,
            email: userCreated.email,
            id: userCreated._id,
        });
    })
    
    //!Login
    //!Profile
};

module.exports = usersController;
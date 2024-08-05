const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

//! user Registration
// exporting my controllers as an object
const usersController = {
    //!Register
    register: asyncHandler(async (req, res) => {
        const {username, email, password} = req.body;
    
        //! Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        //! Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }
    
        //! Hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        //! Create user and save to db
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
    }),
    
    //!Login
    login: asyncHandler(async (req, res) => {
        //! get the user data
        const { email, password } = req.body;
        //! if email exists
        const user = await User.findOne({ email });
        if(!user){
            throw new Error('Invalid login credentials');
        }
        //! compare the user password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error('Invalid login credentials');
        }
        //! generate a token
        const token = jwt.sign({ id:user._id }, 'samuelKey', {
            expiresIn: '30d',
        });
        //! send the response
        res.json({
            message: 'Login Successful',
            token,
            id: user._id,
            email: user.email,
            username: user.username,
        })
    }),

    //!Profile
    profile: asyncHandler(async (req, res) => {
        //! Find the user
        const user = await User.findById(req.user);
        if(!user){
            throw new Error('User not found');
        }
        //! send the response
        res.json({ username: user.username, email: user.email });
    }),

    //! update or change password
    changeUserPassword: asyncHandler(async (req, res) => {
        const {newPassword} = req.body;
        //! Find the user
        console.log(req.user);
        const user = await User.findById(req.user);
        if(!user){
            throw new Error('User not found');
        }
        //! hash the new password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        //! re-save user
        await user.save();
        //! send the response
        res.json({ message: 'Password updated successfully' });
    }),

    //! update or update user profile
    updateUserProfile: asyncHandler(async (req, res) => {
        const {email, username} = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.user,{
            username, email,
        }, {
            new: true,
        });
        res.json({ message: 'User profile updated successfully', updatedUser });
    }),
};

module.exports = usersController;
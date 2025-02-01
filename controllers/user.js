import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";

// export const getAllUsers = async (req, res, next) => {
//     try {
//         // The - indicates that this field should not be included in the retrieved document.
//         // Not have to use -password as have defined select : false in models.js
//         // const users = await User.find().select('-password'); 
//         // const users = await User.find().select('+password');
//         const users = await User.find()

//         // console.log(`Get all users request body: ${req.body}`);

//         res.status(200).json(users);

//     } catch (error) {
//         return next(new ErrorHandler(error, 500));
//     }
// }

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email }).select('+password');

        if (!user) return next(new ErrorHandler('User not found', 400));

        const isMatch = await bcrypt.compare(password, user.password);
        // Since we're manually comparing password here, we need user.password which will only come if we're explicitly defining +password as we have used select false in password.

        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        createCookie(res, user, `Welcome back ${user.username}`);
    } catch (error) {
        return next(new ErrorHandler(error, 500));
    }

}
export const logoutUser = (req, res) => {
    // If user is logged in, remove their token
    res.status(201).cookie('token', '', {
        expires: new Date(Date.now()), // expire cookie
        httpOnly: true,
        sameSite: process.env.NODE_ENV !== 'production'? 'none': 'lax',
            secure: process.env.NODE_ENV !== 'production'? true : false,
    }).json({ message:'User logged out successfully', user: req.user });
};
export const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const user = await User.create({ username: username, email: email, password: hashedPassword });
        
        createCookie(res, user, `User registered successfully with user id ${user.id}`);

    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}

// export const getUserDetails = async (req, res) => {
//     const userId = req.params.id;
//     // if using url query instead of params, use req.query instead

//     try {
//         // Not have to use as have defined select : false in models.js
//         // const user = await User.findById(userId).select('-password'); 
//         const user = await User.findById(userId);

//         if (!user) return res.status(404).json({ message: 'User not found' });

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }


/* Here we had only one route which required to check if the user is logged in or not but if we had multiple routes? So we will create a middleware to check if the user is logged in or not instead
export const getMyDetails = async (req, res) => {

    const {token} = req.cookies;
    if(!token) return res.status(401).json({ message: 'Login First' });  // if token is not present, return 401 Unauthorized

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
*/

export const getMyDetails = async (req, res, next) => {

    try {
        const user = req.user;
        if (!user) return next(new ErrorHandler('User not found', 400));

        res.status(200).json(user);

    } catch (error) {
        return next(new ErrorHandler(error, 500));
    }
}
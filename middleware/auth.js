import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';

// Middleware to check if user is authenticated before accessing protected routes
export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'Login First' });  // if token is not present, return 401 Unauthorized

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
}
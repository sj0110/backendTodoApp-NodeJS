import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { registerUser, loginUser, logoutUser, getMyDetails } from '../controllers/user.js';

const router = express.Router();

// router.get('/all', getAllUsers);
router.post('/new', registerUser);
router.get('/login', loginUser);
router.get('/logout', logoutUser);
// router.route('/:id').get(getUserDetails);
router.get('/me', isAuthenticated, getMyDetails);

export default router;
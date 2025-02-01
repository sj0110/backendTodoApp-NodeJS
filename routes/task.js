import express from 'express';
import { isAuthenticated} from '../middleware/auth.js';
import { createTask, getUserAllTasks, updateTaskStatus, deleteTask } from '../controllers/task.js';
const router = express.Router();

router.get('/all', isAuthenticated, getUserAllTasks);
router.post('/new', isAuthenticated, createTask);
router.route('/:id').put(isAuthenticated, updateTaskStatus).delete(isAuthenticated, deleteTask);
// router.get('/:id', getTaskDetails);


export default router;
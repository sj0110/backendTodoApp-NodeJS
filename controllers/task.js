import ErrorHandler from '../middleware/error.js';
import { Task } from '../models/task.js';

export const createTask = async (req, res, next) => {
    try {
        const { title, description, dueDate } = req.body;
        const task = await Task.create({
            title, 
            description, 
            dueDate, 
            userId: req.user._id,
        });
        res.status(201).json(task);
    } catch (error) {
        return next(new ErrorHandler(error, 500));
    }
};

export const getUserAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.status(200).json(tasks);
    } catch (error) {
        return next(new ErrorHandler(error, 500));
    }
}

export const updateTaskStatus = async (req, res, next) => {

    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        if (!task) return next(new Error('Task not found'));
        
        task.completed = !task.completed;
        await task.save();
        res.status(200).json(task);

    } catch (error) {
        return next(new ErrorHandler(error, 500));
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return next(new ErrorHandler('Task not found', 404));
        res.status(200).json({
            message: 'Task deleted successfully',
        });
    } catch (error) {
        return next(new ErrorHandler(error, 500));
    }
}
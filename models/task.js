import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    completed: { type: Boolean, default: false }, 
});

export const Task = mongoose.model('Task', schema);
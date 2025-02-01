import mongoose from 'mongoose';

export const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'todobackend',
    })
        .then(() => console.log('MongoDB Connected...'))
        .catch((e) => console.log(e));
};
import mongoose from 'mongoose';

export const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'todobackend',
    })
        .then((c) => console.log('MongoDB Connected on ' + c.connection.host + ': ' + c.connection.port))
        .catch((e) => console.log(e));
};
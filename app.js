import express from 'express';
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import {config} from 'dotenv'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleware/error.js'

export const app = express();

// Load environment variables from .env file
config({
    path: './.env'
})

// Using Middleware
app.use(cookieParser())
app.use(express.json()); // Make sure app.use(express.json()) is used before accessing routes
app.use('/users', userRouter);
app.use('/tasks', taskRouter);


// Using Routes
app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.use(errorMiddleware);




import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middleware/error';
import userRouter from './routes/user.route';
import poemRouter from './routes/poem.route';
import orderRouter from './routes/order.route';
import notificationRouter from './routes/notification.route';
import adminRouter from './routes/admin.route';
import layoutRouter from './routes/layout.route';

require('dotenv').config();

// Initialize Express app
export const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cors({
    origin: process.env.ORIGIN
}));

// cookie-parser
app.use(cookieParser());

// routes
app.use('/api/v1/users', userRouter, notificationRouter);
app.use('/api/v1/poems', poemRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/admin', adminRouter, layoutRouter);

// testing API
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "API is working!" 
    })
});

//unknown Route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error ( `Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404,
    next(err)
});

app.use(errorMiddleware);


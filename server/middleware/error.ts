
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Wrong MongoDB ID error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // duplicate key error 
    if(err.code === 11000){
        const message = `duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // wrong jwt error 
    if(err.name === 'jsonWebTokenError') {
        const message = `Json web token is invalid, please try again`;
        err = new ErrorHandler(message, 400);
    }

    // jwt expired error 
    if(err.name === 'TokenExpiredError') {
        const message = `Json web token has expired`
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        // Optionally include stack trace in development mode
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};

export default errorMiddleware;

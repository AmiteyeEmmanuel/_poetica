import { Request, Response, NextFunction } from 'express';

const catchAsyncError = (theFunc: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        theFunc(req, res, next).catch(next);
    };
};

export default catchAsyncError;

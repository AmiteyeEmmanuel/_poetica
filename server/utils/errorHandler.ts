class ErrorHandler extends Error {
    statusCode: Number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;

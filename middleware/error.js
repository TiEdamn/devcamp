const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    let data = {};

    error.message = err.message;

    // Log to console for dev
    if (process.env.NODE_ENV !== 'production') console.log(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        message = 'Validation error';
        Object.keys(err.errors).map(val => {
            data[val] = err.errors[val].message;
        });
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
        data
    });
};

module.exports = errorHandler;

import { errorResponse } from '../utils/response.js';

export const notFoundHandler = (req, res, next) => {
  if (!req.originalUrl.startsWith('/api')) {
    return next();
  }
  return errorResponse(res, `Resource not found: ${req.method} ${req.originalUrl}`, 404);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Internal Server Error';
  let errors = [];

  // Mongoose Duplicate Key Error (E11000) -> 409 Conflict
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
    errors = [{ field, message }];
  }

  // Mongoose Validation Error -> 400 Bad Request
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation error';
    errors = Object.values(err.errors || {}).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // JWT Errors -> 401 Unauthorized
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication failed: Invalid or expired token';
  }

  // CastError (invalid ObjectId) -> 404 Not Found
  if (err.name === 'CastError') {
    statusCode = 404;
    message = `Resource not found with specified identifier: ${err.value}`;
  }

  // Never expose stack trace in production responses
  return errorResponse(res, message, statusCode, errors);
};

export default {
  notFoundHandler,
  errorHandler,
};

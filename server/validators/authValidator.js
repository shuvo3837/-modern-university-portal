import { errorResponse } from '../utils/response.js';

export const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return errorResponse(res, 'Email and password are required', 400);
  }
  next();
};

export const validateSignupInput = (req, res, next) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    return errorResponse(res, 'Name, username, email, and password are required', 400);
  }
  if (password.length < 6) {
    return errorResponse(res, 'Password must be at least 6 characters', 400);
  }
  next();
};

import { errorResponse } from '../utils/response.js';

export const validateRegister = (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  const errors = [];

  if (!username || !username.trim()) {
    errors.push({ field: 'username', message: 'Username is required' });
  } else if (username.trim().length < 3) {
    errors.push({ field: 'username', message: 'Username must be at least 3 characters' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!emailRegex.test(email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters long' });
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Validation failed for registration input', 400, errors);
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, username, identifier: id, password } = req.body;
  const identifier = id || email || username;
  const errors = [];

  if (!identifier || !identifier.trim()) {
    errors.push({ field: 'identifier', message: 'Email or username is required' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Validation failed for login input', 400, errors);
  }

  next();
};

export const validateForgotPassword = (req, res, next) => {
  const { email } = req.body;
  if (!email || !email.trim()) {
    return errorResponse(res, 'Email address is required for password recovery', 400, [
      { field: 'email', message: 'Email is required' },
    ]);
  }
  next();
};

export const validateResetPassword = (req, res, next) => {
  const { token, newPassword } = req.body;
  const errors = [];
  if (!token) errors.push({ field: 'token', message: 'Reset token is required' });
  if (!newPassword || newPassword.length < 6) {
    errors.push({ field: 'newPassword', message: 'New password must be at least 6 characters' });
  }
  if (errors.length > 0) {
    return errorResponse(res, 'Validation failed for password reset', 400, errors);
  }
  next();
};

export default {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
};

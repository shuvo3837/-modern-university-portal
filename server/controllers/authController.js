import authService from '../services/authService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.authenticateUser(email, password);
    return successResponse(res, result, 'User logged in successfully');
  } catch (err) {
    return errorResponse(res, err.message, 401);
  }
};

export const signup = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    return successResponse(res, result, 'User registered successfully', 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const getMe = async (req, res, next) => {
  try {
    return successResponse(res, req.user, 'Current user profile retrieved');
  } catch (err) {
    next(err);
  }
};

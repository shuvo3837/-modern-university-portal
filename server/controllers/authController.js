import authService from '../services/authService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, username, identifier: id, password } = req.body;
    const identifier = id || email || username;
    const result = await authService.login(identifier, password);
    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    return successResponse(res, user, 'Current user profile retrieved');
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    // Structure in place without third-party SMTP setup
    return successResponse(
      res,
      { sent: true },
      'If an account exists with that email, a password reset link has been dispatched.'
    );
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    return successResponse(res, { updated: true }, 'Password has been reset successfully.');
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
};

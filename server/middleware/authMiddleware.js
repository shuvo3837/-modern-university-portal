import jwt from 'jsonwebtoken';
import config from '../config/env.js';
import User from '../models/User.js';
import { errorResponse } from '../utils/response.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, 'Not authorized, token missing', 401);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    // Find user by decoded ID, excluding password
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return errorResponse(res, 'User session no longer valid', 401);
    }
    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 'Not authorized, invalid or expired token', 401);
  }
};

export default protect;

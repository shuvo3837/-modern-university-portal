import jwt from 'jsonwebtoken';
import config from '../config/env.js';
import User from '../models/User.js';
import { errorResponse } from '../utils/response.js';

/**
 * Authentication Middleware
 * Validates Bearer token in Authorization header and attaches { id, role, ... } to req.user
 */
export const protect = async (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, 'Authentication required. No token provided.', 401);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const userId = decoded.userId || decoded.id;

    // Verify user exists and is active
    const user = await User.findById(userId).select('-password');
    if (!user || !user.isActive) {
      return errorResponse(res, 'User session invalid or account deactivated.', 401);
    }

    req.user = {
      id: user._id.toString(),
      _id: user._id,
      username: user.username,
      email: user.email,
      role: (decoded.role || user.role).toLowerCase(),
      isActive: user.isActive,
    };

    next();
  } catch (error) {
    return errorResponse(res, 'Invalid, expired, or malformed authentication token.', 401);
  }
};

export default protect;

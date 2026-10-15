import jwt from 'jsonwebtoken';
import config from '../config/env.js';

/**
 * Generate JSON Web Token with userId and role
 * @param {string|Object} userId
 * @param {string} role
 * @returns {string}
 */
export const generateToken = (userId, role = 'student') => {
  return jwt.sign(
    {
      userId: userId.toString ? userId.toString() : userId,
      role: role.toLowerCase(),
    },
    config.jwtSecret,
    {
      expiresIn: config.jwtExpiresIn || '7d',
    }
  );
};

export default generateToken;

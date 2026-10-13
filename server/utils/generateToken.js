import jwt from 'jsonwebtoken';
import config from '../config/env.js';

/**
 * Generate JSON Web Token for authenticated user
 * @param {string|Object} userId
 * @returns {string}
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

export default generateToken;

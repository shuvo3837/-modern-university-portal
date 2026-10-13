/**
 * Client-side Form and Data Validators
 */

/**
 * Validate email address format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
};

/**
 * Validate password requirements (min 6 chars)
 * @param {string} password
 * @returns {boolean}
 */
export const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
};

/**
 * Validate username (alphanumeric, underscores, 3-20 chars)
 * @param {string} username
 * @returns {boolean}
 */
export const isValidUsername = (username) => {
  const userRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return userRegex.test(username);
};

/**
 * Validate room code format (e.g., 6 alphanumeric characters)
 * @param {string} code
 * @returns {boolean}
 */
export const isValidRoomCode = (code) => {
  const codeRegex = /^[A-Z0-9]{6}$/;
  return codeRegex.test(String(code).trim().toUpperCase());
};

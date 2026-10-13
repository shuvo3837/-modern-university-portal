/**
 * Authentication Service
 * Manages login, registration, user token persistence, and profile fetching.
 */

import api from './api';
import { STORAGE_KEYS } from '../utils/constants';

export const authService = {
  /**
   * Login with email and password
   * @param {{ email: string, password: string }} credentials
   */
  async login(credentials) {
    const res = await api.post('/auth/login', credentials);
    if (res.data?.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, res.data.token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(res.data.user));
    }
    return res;
  },

  /**
   * Register a new user
   * @param {Object} userData
   */
  async signup(userData) {
    const res = await api.post('/auth/signup', userData);
    if (res.data?.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, res.data.token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(res.data.user));
    }
    return res;
  },

  /**
   * Fetch current authenticated user
   */
  async getCurrentUser() {
    return api.get('/auth/me');
  },

  /**
   * Log out user and clear storage
   */
  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  /**
   * Check if token is locally present
   */
  isAuthenticated() {
    return Boolean(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN));
  },
};

export default authService;

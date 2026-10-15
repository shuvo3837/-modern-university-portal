/**
 * Authentication Service
 * Manages login, registration, user token persistence, and profile fetching.
 */

import api from './api';
import { STORAGE_KEYS } from '../utils/constants';

export const authService = {
  /**
   * Login with email/username and password
   * @param {{ email?: string, username?: string, password: string }} credentials
   */
  async login(credentials) {
    const res = await api.post('/auth/login', credentials);
    const token = res.token || res.data?.token;
    const user = res.user || res.data?.user;

    if (token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      }
    }
    return res;
  },

  /**
   * Register a new user
   * @param {{ username: string, email: string, password: string, confirmPassword?: string, role?: string }} userData
   */
  async register(userData) {
    const res = await api.post('/auth/register', userData);
    const token = res.token || res.data?.token;
    const user = res.user || res.data?.user;

    if (token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      }
    }
    return res;
  },

  async signup(userData) {
    return this.register(userData);
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

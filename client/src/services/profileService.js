/**
 * Profile & People Service
 * Handles user profile updates and public directory listings.
 */

import api from './api';

export const profileService = {
  /**
   * Get authenticated user profile
   */
  async getMyProfile() {
    return api.get('/profile/me');
  },

  /**
   * Get public profile by username
   * @param {string} username
   */
  async getProfileByUsername(username) {
    return api.get(`/profile/${username}`);
  },

  /**
   * Update authenticated user profile
   * @param {Object} profileData
   */
  async updateProfile(profileData) {
    return api.put('/profile/me', profileData);
  },

  /**
   * List directory of people (search, role, department)
   * GET /api/users?search=&role=&department=
   * @param {Object} params
   */
  async getUsers(params = {}) {
    return api.get('/users', { params });
  },

  async getPeople(params = {}) {
    return this.getUsers(params);
  },
};

export default profileService;

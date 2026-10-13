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
   * List directory of people (teachers, students, staff)
   * @param {Object} params
   */
  async getPeople(params = {}) {
    return api.get('/users/people', { params });
  },

  /**
   * Get teacher specific profile
   * @param {string} teacherId
   */
  async getTeacherProfile(teacherId) {
    return api.get(`/users/teachers/${teacherId}`);
  },
};

export default profileService;

/**
 * Schedule Service
 * Manages academic schedules, classes, office hours, and personal events.
 */

import api from './api';

export const scheduleService = {
  /**
   * Get schedule entries
   * @param {Object} params
   */
  async getSchedules(params = {}) {
    return api.get('/schedule', { params });
  },

  /**
   * Get single schedule entry by ID
   * @param {string} id
   */
  async getScheduleById(id) {
    return api.get(`/schedule/${id}`);
  },

  /**
   * Create a new schedule entry
   * @param {Object} scheduleData
   */
  async createSchedule(scheduleData) {
    return api.post('/schedule', scheduleData);
  },

  /**
   * Update an existing schedule entry
   * @param {string} scheduleId
   * @param {Object} scheduleData
   */
  async updateSchedule(scheduleId, scheduleData) {
    return api.put(`/schedule/${scheduleId}`, scheduleData);
  },

  /**
   * Delete a schedule entry
   * @param {string} scheduleId
   */
  async deleteSchedule(scheduleId) {
    return api.delete(`/schedule/${scheduleId}`);
  },
};

export default scheduleService;

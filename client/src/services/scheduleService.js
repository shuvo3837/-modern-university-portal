/**
 * Schedule Service
 * Manages academic schedules, classes, office hours, and personal events.
 */

import api from './api';

export const scheduleService = {
  /**
   * Get user schedule entries
   * @param {Object} params - e.g. { startDate, endDate, roomId }
   */
  async getSchedules(params = {}) {
    return api.get('/schedules', { params });
  },

  /**
   * Create a new schedule entry
   * @param {Object} scheduleData
   */
  async createSchedule(scheduleData) {
    return api.post('/schedules', scheduleData);
  },

  /**
   * Update an existing schedule entry
   * @param {string} scheduleId
   * @param {Object} scheduleData
   */
  async updateSchedule(scheduleId, scheduleData) {
    return api.put(`/schedules/${scheduleId}`, scheduleData);
  },

  /**
   * Delete a schedule entry
   * @param {string} scheduleId
   */
  async deleteSchedule(scheduleId) {
    return api.delete(`/schedules/${scheduleId}`);
  },
};

export default scheduleService;

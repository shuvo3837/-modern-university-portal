/**
 * Notification Service
 * Manages user notifications and read statuses.
 */

import api from './api';

export const notificationService = {
  /**
   * Fetch user notifications
   */
  async getNotifications() {
    return api.get('/notifications');
  },

  /**
   * Mark a single notification as read
   * @param {string} notificationId
   */
  async markAsRead(notificationId) {
    return api.put(`/notifications/${notificationId}/read`);
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead() {
    return api.put('/notifications/read-all');
  },

  /**
   * Delete a notification
   * @param {string} notificationId
   */
  async deleteNotification(notificationId) {
    return api.delete(`/notifications/${notificationId}`);
  },
};

export default notificationService;

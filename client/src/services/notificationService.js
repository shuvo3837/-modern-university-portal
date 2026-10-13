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
    return api.patch(`/notifications/${notificationId}/read`);
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead() {
    return api.patch('/notifications/read-all');
  },
};

export default notificationService;

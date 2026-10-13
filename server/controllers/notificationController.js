import notificationService from '../services/notificationService.js';
import { successResponse } from '../utils/response.js';

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getUserNotifications(req.user._id);
    return successResponse(res, notifications, 'Notifications fetched');
  } catch (err) {
    next(err);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const notification = await notificationService.markNotificationRead(req.params.id, req.user._id);
    return successResponse(res, notification, 'Notification marked as read');
  } catch (err) {
    next(err);
  }
};

export const markAllAsRead = async (req, res, next) => {
  try {
    await notificationService.markAllNotificationsRead(req.user._id);
    return successResponse(res, null, 'All notifications marked as read');
  } catch (err) {
    next(err);
  }
};

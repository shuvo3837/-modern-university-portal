import Notification from '../models/Notification.js';

export const createNotification = async (notificationData) => {
  return Notification.create(notificationData);
};

export const getUserNotifications = async (userId) => {
  return Notification.find({ recipient: userId }).sort({ createdAt: -1 }).limit(50);
};

export const markNotificationRead = async (notificationId, userId) => {
  return Notification.findOneAndUpdate(
    { _id: notificationId, recipient: userId },
    { isRead: true },
    { new: true }
  );
};

export const markAllNotificationsRead = async (userId) => {
  return Notification.updateMany({ recipient: userId, isRead: false }, { isRead: true });
};

export default {
  createNotification,
  getUserNotifications,
  markNotificationRead,
  markAllNotificationsRead,
};

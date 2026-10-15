import Notification from '../models/Notification.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * GET /api/notifications
 * Retrieve notifications for authenticated user
 */
export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .populate('sender', 'username email role')
      .sort({ createdAt: -1 })
      .limit(50);

    return successResponse(res, notifications, 'Notifications retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/notifications/:id/read
 * Mark single notification as read
 */
export const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user.id },
      { $set: { isRead: true } },
      { new: true }
    );

    if (!notification) {
      return errorResponse(res, 'Notification not found.', 404);
    }

    return successResponse(res, notification, 'Notification marked as read');
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/notifications/read-all
 * Mark all user's notifications as read
 */
export const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, isRead: false },
      { $set: { isRead: true } }
    );

    return successResponse(res, { success: true }, 'All notifications marked as read');
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/notifications/:id
 * Delete a notification
 */
export const deleteNotification = async (req, res, next) => {
  try {
    const result = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user.id,
    });

    if (!result) {
      return errorResponse(res, 'Notification not found.', 404);
    }

    return successResponse(res, { deleted: true }, 'Notification deleted successfully');
  } catch (error) {
    next(error);
  }
};

export default {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};

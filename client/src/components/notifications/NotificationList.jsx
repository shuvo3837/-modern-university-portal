import React from 'react';
import { NotificationItem } from './NotificationItem';

export const NotificationList = ({
  notifications = [],
  onMarkAsRead,
  emptyMessage = 'You are all caught up! No notifications.',
}) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-300 bg-white">
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id || notification._id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
};

export default NotificationList;

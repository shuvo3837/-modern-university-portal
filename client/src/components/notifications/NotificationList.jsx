import React from 'react';
import { NotificationItem } from './NotificationItem';

export const NotificationList = ({
  notifications = [],
  onMarkAsRead,
  emptyMessage = 'You are all caught up! No notifications.',
}) => {
  if (notifications.length === 0) {
    return (
      <div className="warm-sheet text-center">
        <p className="type-14">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="warm-panel">
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

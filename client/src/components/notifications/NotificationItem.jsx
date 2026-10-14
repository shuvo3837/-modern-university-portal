import React from 'react';
import { Bell, Info, UserCheck, MessageSquare } from 'lucide-react';

export const NotificationItem = ({ notification, onMarkAsRead }) => {
  if (!notification) return null;

  const iconMap = {
    announcement: MessageSquare,
    join_request: UserCheck,
    system: Info,
    default: Bell,
  };

  const Icon = iconMap[notification.type] || iconMap.default;

  return (
    <div className="action-card">
      <div className="icon-circle-ink">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <h4 className="action-title truncate">{notification.title}</h4>
        <span className="type-14 shrink-0">{notification.time}</span>
      </div>
      <p className="type-14">{notification.message}</p>
      {notification.unread && onMarkAsRead && (
        <button
          type="button"
          onClick={() => onMarkAsRead(notification.id || notification._id)}
          className="text-link"
        >
          Mark read
        </button>
      )}
    </div>
  );
};

export default NotificationItem;

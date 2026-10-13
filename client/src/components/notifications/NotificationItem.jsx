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
    <div
      className={`p-4 rounded-xl border transition-colors flex items-start gap-3.5 ${
        notification.unread
          ? 'bg-indigo-50/40 border-indigo-100'
          : 'bg-white border-slate-200'
      }`}
    >
      <div
        className={`p-2 rounded-lg shrink-0 ${
          notification.unread ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <h4
            className={`text-sm truncate ${
              notification.unread ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'
            }`}
          >
            {notification.title}
          </h4>
          <span className="text-[11px] text-slate-400 shrink-0">{notification.time}</span>
        </div>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notification.message}</p>
      </div>

      {notification.unread && onMarkAsRead && (
        <button
          type="button"
          onClick={() => onMarkAsRead(notification.id || notification._id)}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium shrink-0 self-center"
        >
          Mark read
        </button>
      )}
    </div>
  );
};

export default NotificationItem;

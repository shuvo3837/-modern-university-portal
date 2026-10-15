import React from 'react';
import { Bell, Calendar, UserPlus, CheckCircle, MessageSquare, Check } from 'lucide-react';
import { Badge } from '../common/Badge';

export const NotificationItem = ({ notification, onMarkAsRead }) => {
  if (!notification) return null;

  const categoryIcon = {
    Schedule: Calendar,
    Requests: UserPlus,
    Rooms: MessageSquare,
  }[notification.category] || Bell;

  const Icon = categoryIcon;

  const isUnread = notification.unread !== undefined ? notification.unread : !notification.isRead;
  const notifId = notification._id || notification.id;

  return (
    <div
      className={`rounded-lg border p-4 transition-all flex items-start gap-3.5 ${
        isUnread
          ? 'bg-white border-[#3157D5]/40 shadow-2xs'
          : 'bg-[#F7F8FA]/60 border-[#E2E6EE] opacity-85'
      }`}
    >
      <div
        className={`p-2 rounded-md shrink-0 border ${
          isUnread
            ? 'bg-[#3157D5]/10 text-[#3157D5] border-[#3157D5]/20'
            : 'bg-white text-[#5B6475] border-[#E2E6EE]'
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h4
              className={`text-xs sm:text-sm tracking-tight ${
                isUnread
                  ? 'font-bold text-[#172033]'
                  : 'font-medium text-[#5B6475]'
              }`}
            >
              {notification.title}
            </h4>
            <Badge variant="neutral" size="xs">
              {notification.category || notification.type || 'General'}
            </Badge>
          </div>
          <span className="text-[11px] text-[#5B6475] font-mono shrink-0">
            {notification.time || (notification.createdAt ? new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '')}
          </span>
        </div>

        <p className="text-xs text-[#5B6475] mt-1 leading-relaxed">
          {notification.message}
        </p>
      </div>

      {isUnread && onMarkAsRead && (
        <button
          type="button"
          onClick={() => onMarkAsRead(notifId)}
          className="shrink-0 p-1 rounded hover:bg-slate-100 text-[#5B6475] hover:text-[#172033] transition-colors cursor-pointer"
          title="Mark as read"
        >
          <Check className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default NotificationItem;

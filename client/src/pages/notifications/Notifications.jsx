import React, { useState } from 'react';
import { CheckCheck, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';
import { NotificationItem } from '../../components/notifications/NotificationItem';
import { EmptyState } from '../../components/common/EmptyState';

export const Notifications = () => {
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterOptions = ['All', 'Rooms', 'Schedule', 'Requests'];

  const filteredNotifications = (notifications || []).filter((item) => {
    if (selectedFilter === 'All') return true;
    return (item.category || item.type || '').toLowerCase().includes(selectedFilter.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2E6EE]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-[#3157D5] text-white">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-xs text-[#5B6475] mt-0.5">
            Class schedules, room approval requests, and university announcements.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="secondary"
            size="sm"
            icon={CheckCheck}
            onClick={markAllNotificationsRead}
          >
            Mark All Read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {filterOptions.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setSelectedFilter(opt)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === opt
                ? 'bg-[#172033] text-white shadow-2xs'
                : 'bg-white border border-[#E2E6EE] text-[#5B6475] hover:text-[#172033]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="You're all caught up."
          description="There are no notifications in this category."
        />
      ) : (
        <div className="space-y-2.5">
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={markNotificationRead}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;

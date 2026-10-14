import React, { useState } from 'react';
import { CheckCheck } from 'lucide-react';
import { NotificationList } from '../../components/notifications/NotificationList';
import { Button } from '../../components/common/Button';
import { mockNotifications } from '../../data/mockData';

export const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="page-head">
        <div>
          <h1 className="page-title">Campus Notifications</h1>
          <p className="text-sm text-slate-500 mt-1">
            Stay informed with room announcements, join requests, and academic alerts.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={CheckCheck}
          onClick={handleMarkAllRead}
        >
          Mark all as read
        </Button>
      </div>

      <NotificationList
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
};

export default Notifications;

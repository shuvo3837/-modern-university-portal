import React from 'react';
import { Badge } from '../common/Badge';

export const NotificationBadge = ({ count, className = '' }) => {
  if (!count || count <= 0) return null;

  return (
    <span
      className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none bg-[#3157D5] text-white ${className}`}
    >
      {count}
    </span>
  );
};

export default NotificationBadge;

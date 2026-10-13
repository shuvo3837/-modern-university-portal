import React from 'react';
import { ScheduleItem } from './ScheduleItem';

export const ScheduleCalendar = ({ schedules = [], emptyMessage = 'No schedule events found.' }) => {
  if (schedules.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-300 bg-white">
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {schedules.map((schedule) => (
        <ScheduleItem key={schedule.id || schedule._id} item={schedule} />
      ))}
    </div>
  );
};

export default ScheduleCalendar;

import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, User } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ScheduleItem = ({ item }) => {
  if (!item) return null;

  const typeVariant = {
    Lecture: 'indigo',
    Lab: 'purple',
    'Office Hours': 'emerald',
    Seminar: 'amber',
    Exam: 'rose',
  }[item.type] || 'slate';

  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 transition-colors shadow-2xs">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
        <Badge variant={typeVariant}>{item.type}</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 mt-3">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {item.startTime} - {item.endTime}
          </span>
        </div>
        {item.location && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{item.location}</span>
          </div>
        )}
        {item.room && (
          <div className="flex items-center gap-1.5 font-medium text-slate-600">
            <span>Room: {item.room}</span>
          </div>
        )}
        {item.instructor && (
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{item.instructor}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleItem;

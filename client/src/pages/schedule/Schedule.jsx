import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { ScheduleCalendar } from '../../components/schedule/ScheduleCalendar';
import { Button } from '../../components/common/Button';
import { mockSchedules } from '../../data/mockData';
import { SCHEDULE_TYPES } from '../../utils/constants';

export const Schedule = () => {
  const [selectedType, setSelectedType] = useState('ALL');

  const filteredSchedules = mockSchedules.filter((item) => {
    return selectedType === 'ALL' || item.type === selectedType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Schedule</h1>
          <p className="text-sm text-slate-500 mt-1">
            Lectures, lab sessions, office hours, and university examinations.
          </p>
        </div>

        <Link to="/schedule/create">
          <Button variant="primary" size="sm" icon={PlusCircle}>
            Add Schedule Event
          </Button>
        </Link>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-400" />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="ALL">All Event Types</option>
          {Object.values(SCHEDULE_TYPES).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <ScheduleCalendar schedules={filteredSchedules} />
    </div>
  );
};

export default Schedule;

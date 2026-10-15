import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info, Shield, Eye } from 'lucide-react';
import { ScheduleEvent } from './ScheduleEvent';
import { Button } from '../common/Button';

export const ScheduleGrid = ({ events = [], viewRole = 'Teacher', onViewRoleChange }) => {
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['09:00', '11:00', '13:00', '15:00'];

  const getWeekRangeLabel = (offset) => {
    if (offset === 0) return 'Current Week (Oct 12 - Oct 16, 2026)';
    if (offset === -1) return 'Previous Week (Oct 05 - Oct 09, 2026)';
    if (offset === 1) return 'Next Week (Oct 19 - Oct 23, 2026)';
    return `Week ${offset > 0 ? '+' : ''}${offset}`;
  };

  return (
    <div className="space-y-4">
      {/* Schedule Header: Controls & Week Selector */}
      <div className="bg-white rounded-lg border border-[#E2E6EE] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Week navigation */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentWeekOffset((prev) => prev - 1)}
            icon={ChevronLeft}
            title="Previous Week"
          >
            Prev
          </Button>

          <button
            type="button"
            onClick={() => setCurrentWeekOffset(0)}
            className="px-3 py-1.5 rounded-md text-xs font-semibold bg-[#F7F8FA] border border-[#E2E6EE] text-[#172033] hover:bg-slate-100 transition-colors"
          >
            Current Week
          </button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentWeekOffset((prev) => prev + 1)}
            title="Next Week"
          >
            <span className="flex items-center gap-1">
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </span>
          </Button>

          <span className="text-xs font-bold text-[#172033] ml-2 hidden md:inline">
            {getWeekRangeLabel(currentWeekOffset)}
          </span>
        </div>

        {/* Schedule Privacy Perspective Toggle */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-[#5B6475] font-medium flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-[#3157D5]" />
            <span className="hidden sm:inline">Perspective:</span>
          </span>
          <div className="inline-flex rounded-md border border-[#E2E6EE] bg-[#F7F8FA] p-0.5 text-xs">
            {['Teacher', 'Student', 'Authorized'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => onViewRoleChange && onViewRoleChange(role)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  viewRole === role
                    ? 'bg-white text-[#172033] shadow-2xs font-bold'
                    : 'text-[#5B6475] hover:text-[#172033]'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Explanation Banner */}
      <div className="rounded-md border border-[#E2E6EE] bg-[#F7F8FA] px-4 py-2.5 flex items-start sm:items-center gap-2.5 text-xs text-[#5B6475]">
        <Shield className="w-4 h-4 text-[#3157D5] shrink-0 mt-0.5 sm:mt-0" />
        <p className="leading-normal">
          <span className="font-semibold text-[#172033]">Schedule Privacy Active: </span>
          {viewRole === 'Teacher' &&
            'Viewing as Owner / Teacher. Full event titles and confidential consultations are visible.'}
          {viewRole === 'Student' &&
            'Viewing as Student. Private meetings and closed consultations are masked as "Busy" for student privacy.'}
          {viewRole === 'Authorized' &&
            'Viewing as Department Colleague. Department meetings and course sessions are visible.'}
        </p>
      </div>

      {/* Weekly Schedule Grid */}
      <div className="bg-white rounded-lg border border-[#E2E6EE] overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Days Header Column */}
          <div className="grid grid-cols-6 border-b border-[#E2E6EE] bg-[#F7F8FA] text-xs font-semibold text-[#172033]">
            <div className="p-3 border-r border-[#E2E6EE] text-[#5B6475] text-[11px] uppercase tracking-wider text-center">
              Time
            </div>
            {days.map((day) => (
              <div key={day} className="p-3 border-r border-[#E2E6EE] last:border-r-0 text-center">
                <span className="block font-bold">{day}</span>
                <span className="text-[10px] text-[#5B6475] font-normal uppercase tracking-wide">
                  Semester Week
                </span>
              </div>
            ))}
          </div>

          {/* Time Rows */}
          <div className="divide-y divide-[#E2E6EE]">
            {timeSlots.map((slotTime) => (
              <div key={slotTime} className="grid grid-cols-6 min-h-[110px]">
                {/* Time Column */}
                <div className="p-3 border-r border-[#E2E6EE] bg-[#F7F8FA] font-mono text-xs font-bold text-[#5B6475] flex items-start justify-center pt-3">
                  {slotTime}
                </div>

                {/* Day Columns */}
                {days.map((day) => {
                  const dayEvents = events.filter((e) => {
                    const matchesDay = e.day === day;
                    // Check if event starts around this slot
                    const slotHour = parseInt(slotTime.split(':')[0], 10);
                    const eventHour = parseInt(e.startTime.split(':')[0], 10);
                    const isInSlot = eventHour >= slotHour && eventHour < slotHour + 2;
                    return matchesDay && isInSlot;
                  });

                  return (
                    <div
                      key={`${day}_${slotTime}`}
                      className="p-2 border-r border-[#E2E6EE] last:border-r-0 space-y-2 hover:bg-[#F7F8FA]/50 transition-colors"
                    >
                      {dayEvents.map((evt) => (
                        <ScheduleEvent
                          key={evt.id}
                          event={evt}
                          viewRole={viewRole}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleGrid;

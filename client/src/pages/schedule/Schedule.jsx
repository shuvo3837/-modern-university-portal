import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, Shield, Info } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { ScheduleGrid } from '../../components/schedule/ScheduleGrid';
import { useApp } from '../../context/AppContext';

export const Schedule = () => {
  const { schedules, scheduleViewRole, setScheduleViewRole } = useApp();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2E6EE]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">
            Academic Schedule
          </h1>
          <p className="text-xs text-[#5B6475] mt-0.5">
            Weekly lecture timetables, faculty consultation hours, and department sessions.
          </p>
        </div>

        <Link to="/schedule/create">
          <Button variant="accent" size="sm" icon={Plus}>
            Create Schedule
          </Button>
        </Link>
      </div>

      {/* Schedule Weekly Timetable Grid */}
      <ScheduleGrid
        events={schedules}
        viewRole={scheduleViewRole}
        onViewRoleChange={setScheduleViewRole}
      />
    </div>
  );
};

export default Schedule;

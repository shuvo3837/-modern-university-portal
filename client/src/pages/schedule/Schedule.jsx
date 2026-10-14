import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { ScheduleCalendar } from '../../components/schedule/ScheduleCalendar';
import { Button } from '../../components/common/Button';
import { AuditSelect } from '../../components/common/AuditSelect';
import { mockSchedules } from '../../data/mockData';
import { SCHEDULE_TYPES } from '../../utils/constants';

export const Schedule = () => {
  const [selectedType, setSelectedType] = useState('ALL');

  const filteredSchedules = mockSchedules.filter((item) => {
    return selectedType === 'ALL' || item.type === selectedType;
  });

  return (
    <div className="space-y-6">
      <div className="page-head">
        <div>
          <h1 className="page-title">Academic Schedule</h1>
          <p className="type-14">
            Lectures, lab sessions, office hours, and university examinations.
          </p>
        </div>

        <Link to="/schedule/create">
          <Button variant="add" icon={PlusCircle}>
            Add Schedule Event
          </Button>
        </Link>
      </div>

      {/* Filter Row */}
      <AuditSelect
        name="type"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        options={[
          { value: 'ALL', label: 'All Event Types' },
          ...Object.values(SCHEDULE_TYPES).map((type) => ({ value: type, label: type })),
        ]}
      />

      <ScheduleCalendar schedules={filteredSchedules} />
    </div>
  );
};

export default Schedule;

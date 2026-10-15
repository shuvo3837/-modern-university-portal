import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Shield, Info, Clock, Calendar } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { useApp } from '../../context/AppContext';

export const CreateSchedule = () => {
  const navigate = useNavigate();
  const { addScheduleEvent } = useApp();

  const [formData, setFormData] = useState({
    type: 'Class', // Activity type: Class, Meeting, Consultation, Research, Available, Private
    title: '',
    day: 'Monday',
    date: '2026-10-12',
    startTime: '09:00',
    endTime: '10:30',
    room: 'Turing Hall 101',
    repeat: 'Weekly', // None, Daily, Weekly, Bi-weekly
    visibility: 'Department', // Public, University, Department, Teachers, Students, Selected Users, Private
    reminder: '15 minutes before', // 15 mins, 30 mins, 1 hour, None
  });

  const [error, setError] = useState('');

  const activityTypes = [
    { value: 'Class', label: 'Class / Lecture' },
    { value: 'Meeting', label: 'Department / Faculty Meeting' },
    { value: 'Consultation', label: 'Student Consultation' },
    { value: 'Research', label: 'Research Colloquium' },
    { value: 'Available', label: 'Available (Open Office Hours)' },
    { value: 'Private', label: 'Private / Confidential Meeting' },
  ];

  const repeatOptions = [
    { value: 'None', label: 'Does not repeat' },
    { value: 'Daily', label: 'Daily (Mon-Fri)' },
    { value: 'Weekly', label: 'Weekly on scheduled day' },
    { value: 'Bi-weekly', label: 'Every 2 weeks' },
  ];

  const visibilityOptions = [
    { value: 'Public', label: 'Public (Anyone on Campus)' },
    { value: 'University', label: 'University-wide' },
    { value: 'Department', label: 'Department Members Only' },
    { value: 'Teachers', label: 'Faculty & Teachers Only' },
    { value: 'Students', label: 'Enrolled Students' },
    { value: 'Selected Users', label: 'Selected Users / Invitees' },
    { value: 'Private', label: 'Private (Masked as "Busy")' },
  ];

  const reminderOptions = [
    { value: '15 minutes before', label: '15 minutes before' },
    { value: '30 minutes before', label: '30 minutes before' },
    { value: '1 hour before', label: '1 hour before' },
    { value: '1 day before', label: '1 day before' },
    { value: 'None', label: 'No reminder' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide an event title.');
      return;
    }

    addScheduleEvent({
      ...formData,
      instructor: user?.fullName || user?.name || user?.username || 'Instructor',
    });

    navigate('/schedule');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        to="/schedule"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6475] hover:text-[#172033] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Weekly Schedule</span>
      </Link>

      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">
          Create Schedule Event
        </h1>
        <p className="text-xs text-[#5B6475] mt-0.5">
          Schedule academic lectures, faculty consultations, or departmental meetings.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Activity Type"
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              options={activityTypes}
              required
            />

            <Input
              label="Event Title"
              id="title"
              placeholder="e.g. CSE 401: Routing Algorithms"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                setError('');
              }}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Day of Week"
              id="day"
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              options={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']}
              required
            />

            <Input
              label="Start Time"
              id="startTime"
              placeholder="09:00"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              icon={Clock}
              required
            />

            <Input
              label="End Time"
              id="endTime"
              placeholder="10:30"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              icon={Clock}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Location / Room"
              id="room"
              placeholder="e.g. Turing Hall 101 or Online"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            />

            <Select
              label="Recurrence / Repeat"
              id="repeat"
              value={formData.repeat}
              onChange={(e) => setFormData({ ...formData, repeat: e.target.value })}
              options={repeatOptions}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Visibility & Privacy"
              id="visibility"
              value={formData.visibility}
              onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
              options={visibilityOptions}
              required
            />

            <Select
              label="Notification Reminder"
              id="reminder"
              value={formData.reminder}
              onChange={(e) => setFormData({ ...formData, reminder: e.target.value })}
              options={reminderOptions}
            />
          </div>

          {/* Privacy Explanation Box as requested */}
          <div className="p-3.5 rounded-md bg-[#F7F8FA] border border-[#E2E6EE] text-xs text-[#5B6475] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#172033]">
              <Shield className="w-3.5 h-3.5 text-[#3157D5]" />
              <span>Institutional Privacy Behavior:</span>
            </div>
            <p className="leading-relaxed">
              Events set to <span className="font-semibold text-[#172033]">{formData.visibility}</span>{' '}
              {formData.visibility === 'Private'
                ? 'will appear as "Busy" to undergraduate scholars while allowing you to preserve your personal schedule confidentiality.'
                : 'will be accessible to authorized university members matching your selected department or faculty tier.'}
            </p>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <Link to="/schedule">
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
            </Link>
            <Button variant="accent" size="sm" type="submit" icon={PlusCircle}>
              Create Schedule
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateSchedule;

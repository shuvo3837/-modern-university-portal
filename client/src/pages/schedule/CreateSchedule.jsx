import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { AuditSelect } from '../../components/common/AuditSelect';
import { AuditDate } from '../../components/common/AuditDate';
import { SCHEDULE_TYPES } from '../../utils/constants';
import scheduleService from '../../services/scheduleService';

export const CreateSchedule = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: SCHEDULE_TYPES.LECTURE,
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    location: '',
    room: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await scheduleService.createSchedule(formData);
      navigate('/schedule');
    } catch (err) {
      // In dev scaffold fallback
      console.log('Created schedule event (scaffold mode):', formData);
      navigate('/schedule');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        to="/schedule"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Schedule</span>
      </Link>

      <div>
        <h1 className="page-title">Create Schedule Event</h1>
        <p className="text-sm text-slate-500 mt-1">
          Add an academic class, office hours slot, or exam session to your calendar.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Event Title"
            name="title"
            placeholder="e.g. CS 106B Lecture: Graph Algorithms"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AuditSelect
              label="Event Type *"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={Object.values(SCHEDULE_TYPES).map((type) => ({ value: type, label: type }))}
            />
            <AuditDate
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Start Time"
              name="startTime"
              placeholder="10:00 AM"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
            <Input
              label="End Time"
              name="endTime"
              placeholder="11:30 AM"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Campus Location / Room"
              name="location"
              placeholder="Gates CS Bldg 104"
              value={formData.location}
              onChange={handleChange}
            />
            <Input
              label="Associated Course / Room Code"
              name="room"
              placeholder="CS 106B"
              value={formData.room}
              onChange={handleChange}
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Link to="/schedule">
              <Button variant="secondary">Cancel</Button>
            </Link>
            <Button variant="add" type="submit" disabled={loading} icon={Plus}>
              {loading ? 'Saving...' : 'Add to Schedule'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateSchedule;

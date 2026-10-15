import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, PlusCircle, AlertCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { ROOM_TYPES, ROOM_ACCESS_TYPES } from '../../utils/constants';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';

export const CreateRoom = () => {
  const navigate = useNavigate();
  const { addRoom } = useApp();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: ROOM_TYPES.COURSE,
    accessType: ROOM_ACCESS_TYPES.APPROVAL,
    description: '',
    department: user?.department || '',
    university: user?.university || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);
    setError('');

    try {
      await addRoom({
        name: formData.name.trim(),
        description: formData.description || '',
        type: formData.type,
        accessType: formData.accessType,
        code: formData.code ? formData.code.trim().toUpperCase() : undefined,
      });

      navigate('/rooms');
    } catch (err) {
      setError(err.message || 'Failed to create room. Please verify your permissions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        to="/rooms"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6475] hover:text-[#172033] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to My Rooms</span>
      </Link>

      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">
          Create Academic Room
        </h1>
        <p className="text-xs text-[#5B6475] mt-0.5">
          Establish a dedicated workspace for a course, department, student group, or project.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Input
            label="Room Name"
            name="name"
            id="roomName"
            placeholder="e.g. CSE 401 — Computer Networks"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Room Code"
              name="code"
              id="roomCode"
              placeholder="e.g. CSE-7K29X"
              value={formData.code}
              onChange={handleChange}
              helperText="Optional custom code for scholars to join. Leave blank to auto-generate."
            />

            <Select
              label="Room Type"
              name="type"
              id="roomType"
              value={formData.type}
              onChange={handleChange}
              options={Object.values(ROOM_TYPES)}
              required
            />
          </div>

          <Select
            label="Access Type"
            name="accessType"
            id="accessType"
            value={formData.accessType}
            onChange={handleChange}
            options={Object.values(ROOM_ACCESS_TYPES)}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-[#172033] mb-1.5 uppercase tracking-wider">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Outline the course objectives, discussion rules, syllabus, and lab session guidelines..."
              className="w-full rounded-md border border-[#E2E6EE] p-2.5 text-xs sm:text-sm text-[#172033] placeholder:text-[#5B6475] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <Link to="/rooms">
              <Button variant="secondary" size="sm" disabled={loading}>
                Cancel
              </Button>
            </Link>
            <Button
              variant="accent"
              size="sm"
              type="submit"
              disabled={loading}
              icon={PlusCircle}
            >
              {loading ? 'Creating...' : 'Create Room'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateRoom;

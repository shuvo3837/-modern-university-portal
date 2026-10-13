import React from 'react';
import { Link } from 'react-router-dom';
import { DoorOpen, Calendar, Users, PlusCircle, ArrowUpRight, Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { RoomList } from '../../components/rooms/RoomList';
import { ScheduleCalendar } from '../../components/schedule/ScheduleCalendar';
import { mockRooms, mockSchedules } from '../../data/mockData';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-indigo-200">
            {user?.university || 'University Campus'} • {user?.department || 'Department'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1">
            Welcome back, {user?.name || 'Scholar'}!
          </h1>
          <p className="text-indigo-100 text-sm mt-1 max-w-xl">
            You are enrolled as <span className="font-semibold">{user?.role || 'Student'}</span>.
            Access your course spaces, faculty schedules, and departmental updates below.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/rooms/join">
            <Button variant="secondary" size="sm">
              Join Room
            </Button>
          </Link>
          <Link to="/rooms/create">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Create Room
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4 p-5">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <DoorOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Enrolled Rooms</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{mockRooms.length}</h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-5">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Upcoming Events</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{mockSchedules.length}</h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Active Role</p>
            <h3 className="text-base font-bold text-slate-900 mt-1">{user?.role || 'Member'}</h3>
          </div>
        </Card>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: My Active Rooms */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">My Rooms & Spaces</h2>
            <Link
              to="/rooms"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <RoomList rooms={mockRooms.slice(0, 3)} />
        </div>

        {/* Right Column: Today's Schedule */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Upcoming Schedule</h2>
            <Link
              to="/schedule"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Full Calendar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <ScheduleCalendar schedules={mockSchedules} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

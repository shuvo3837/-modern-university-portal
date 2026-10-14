import React from 'react';
import { Link } from 'react-router-dom';
import { DoorOpen, Calendar, Users, PlusCircle, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { RoomList } from '../../components/rooms/RoomList';
import { ScheduleCalendar } from '../../components/schedule/ScheduleCalendar';
import { mockRooms, mockSchedules } from '../../data/mockData';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="meeting-board">
        <div className="page-head">
          <div>
            <span className="type-14">
              {user?.university || 'University Campus'} • {user?.department || 'Department'}
            </span>
            <h1 className="page-title">Welcome back, {user?.name || 'Scholar'}!</h1>
            <p className="type-16">
              You are enrolled as {user?.role || 'Student'}. Access your course spaces, faculty
              schedules, and departmental updates below.
            </p>
          </div>
          <div className="page-actions">
            <Link to="/rooms/join">
              <Button variant="secondary">Join Room</Button>
            </Link>
            <Link to="/rooms/create">
              <Button variant="add" icon={PlusCircle}>
                Create Room
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="overview-stats">
        <Card variant="stat">
          <div className="icon-circle-ink">
            <DoorOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="type-14">Enrolled Rooms</p>
            <p className="type-40">{mockRooms.length}</p>
          </div>
        </Card>

        <Card variant="stat">
          <div className="icon-circle-ink">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="type-14">Upcoming Events</p>
            <p className="type-40">{mockSchedules.length}</p>
          </div>
        </Card>

        <Card variant="stat">
          <div className="icon-circle-ink">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="type-14">Active Role</p>
            <p className="type-32">{user?.role || 'Member'}</p>
          </div>
        </Card>
      </div>

      {/* Main Workspace Grid */}
      <div className="overview-lower">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="section-title min-w-0">My Rooms & Spaces</h2>
            <Link to="/rooms" className="text-link inline-flex items-center gap-1">
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <RoomList rooms={mockRooms.slice(0, 3)} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="section-title min-w-0">Upcoming Schedule</h2>
            <Link to="/schedule" className="text-link inline-flex items-center gap-1">
              <span>Full Calendar</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <ScheduleCalendar schedules={mockSchedules} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Hash, Calendar, MessageSquare, Shield } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { mockRooms } from '../../data/mockData';

export const RoomDetails = () => {
  const { roomId } = useParams();
  const [activeTab, setActiveTab] = useState('feed');

  // Find room from mock list or use fallback object
  const room = mockRooms.find((r) => r.id === roomId || r.code === roomId) || {
    id: roomId,
    name: 'CS 106B: Programming Abstractions',
    code: 'CS106B',
    type: 'Course',
    accessType: 'Anyone can join',
    instructor: 'Dr. Julie Zelenski',
    memberCount: 142,
    description: 'Course discussion, announcements, homework help, and lab schedules.',
  };

  return (
    <div className="space-y-6">
      <Link
        to="/rooms"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Rooms</span>
      </Link>

      {/* Room Header Card */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="indigo">{room.type}</Badge>
              <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                <Hash className="w-3 h-3 text-slate-400" />
                {room.code}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{room.name}</h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">{room.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={Users}>
              {room.memberCount} Members
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-4 mt-6 border-b border-slate-100 text-sm">
          <button
            type="button"
            onClick={() => setActiveTab('feed')}
            className={`pb-3 font-medium transition-colors ${
              activeTab === 'feed'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Posts & Discussions
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('members')}
            className={`pb-3 font-medium transition-colors ${
              activeTab === 'members'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Room Members
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schedules')}
            className={`pb-3 font-medium transition-colors ${
              activeTab === 'schedules'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Class Schedule
          </button>
        </div>
      </Card>

      {/* Tab Content Placeholder */}
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
        <MessageSquare className="w-8 h-8 mx-auto text-slate-300 mb-2" />
        <h3 className="font-semibold text-slate-800 text-base">Room Content Feed</h3>
        <p className="text-xs text-slate-500 mt-1">
          Showing active updates for tab: <span className="font-semibold">{activeTab}</span>. Full
          room interaction features will be connected in the subsequent phase.
        </p>
      </div>
    </div>
  );
};

export default RoomDetails;

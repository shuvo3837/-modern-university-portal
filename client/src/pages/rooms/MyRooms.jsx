import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, LogIn, Search, Filter } from 'lucide-react';
import { RoomList } from '../../components/rooms/RoomList';
import { Button } from '../../components/common/Button';
import { mockRooms } from '../../data/mockData';
import { ROOM_TYPES } from '../../utils/constants';

export const MyRooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  const filteredRooms = mockRooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'ALL' || room.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Rooms</h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse, manage, and collaborate across courses, departments, and study spaces.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/rooms/join">
            <Button variant="secondary" size="sm" icon={LogIn}>
              Join with Code
            </Button>
          </Link>
          <Link to="/rooms/create">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Create Room
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by room name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">All Room Types</option>
            {Object.values(ROOM_TYPES).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <RoomList rooms={filteredRooms} emptyMessage="No matching rooms found." />
    </div>
  );
};

export default MyRooms;

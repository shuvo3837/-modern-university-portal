import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PlusCircle, LogIn, Search } from 'lucide-react';
import { RoomList } from '../../components/rooms/RoomList';
import { Button } from '../../components/common/Button';
import { AuditSelect } from '../../components/common/AuditSelect';
import { mockRooms } from '../../data/mockData';
import { ROOM_TYPES } from '../../utils/constants';

export const MyRooms = () => {
  const [params] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(params.get('q') || '');
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
      <div className="page-head">
        <div>
          <h1 className="page-title">Academic Rooms</h1>
          <p className="type-14">
            Browse, manage, and collaborate across courses, departments, and study spaces.
          </p>
        </div>

        <div className="page-actions">
          <Link to="/rooms/join">
            <Button variant="secondary" icon={LogIn}>
              Join with Code
            </Button>
          </Link>
          <Link to="/rooms/create">
            <Button variant="add" icon={PlusCircle}>
              Create Room
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-row">
        <div className="search-wrap">
          <Search />
          <input
            type="text"
            placeholder="Search by room name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-field"
          />
        </div>
        <AuditSelect
          name="type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          options={[
            { value: 'ALL', label: 'All Room Types' },
            ...Object.values(ROOM_TYPES).map((type) => ({ value: type, label: type })),
          ]}
        />
      </div>

      <RoomList rooms={filteredRooms} emptyMessage="No matching rooms found." />
    </div>
  );
};

export default MyRooms;

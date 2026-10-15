import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RoomCard } from '../../components/rooms/RoomCard';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { AddJoinRoomModal } from '../../components/rooms/AddJoinRoomModal';
import { EmptyState } from '../../components/common/EmptyState';
import { ROOM_TYPES } from '../../utils/constants';

export const MyRooms = () => {
  const { rooms, openAddRoomModal, isAddRoomModalOpen, closeAddRoomModal, addRoomModalTab } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterOptions = ['All', 'University', 'Department', 'Course', 'Personal'];

  const filteredRooms = rooms.filter((room) => {
    const matchesFilter = selectedFilter === 'All' || room.type === selectedFilter;
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (room.description && room.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2E6EE]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">
            My Rooms
          </h1>
          <p className="text-xs text-[#5B6475] mt-0.5">
            Academic divisions, course rooms, research groups, and personal spaces.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          icon={Plus}
          onClick={() => openAddRoomModal('create')}
        >
          Create Room
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="w-full sm:max-w-xs">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search rooms by name or code..."
            size="sm"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSelectedFilter(opt)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedFilter === opt
                  ? 'bg-[#172033] text-white shadow-2xs'
                  : 'bg-white border border-[#E2E6EE] text-[#5B6475] hover:text-[#172033] hover:border-slate-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of rooms or empty state */}
      {filteredRooms.length === 0 ? (
        <EmptyState
          title="No rooms match your filter"
          description="Try modifying your search criteria or create a new room space."
          actionLabel="Create Room"
          actionIcon={Plus}
          onAction={() => openAddRoomModal('create')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id || room.code} room={room} />
          ))}
        </div>
      )}

      {/* Add / Join Room Modal */}
      <AddJoinRoomModal
        isOpen={isAddRoomModalOpen}
        onClose={closeAddRoomModal}
        initialTab={addRoomModalTab}
      />
    </div>
  );
};

export default MyRooms;

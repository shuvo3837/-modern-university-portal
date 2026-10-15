import React from 'react';
import { Link } from 'react-router-dom';
import {
  DoorOpen,
  Plus,
  ArrowRight,
  LogIn,
  PlusCircle,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';
import { RoomCard } from '../../components/rooms/RoomCard';
import { AddJoinRoomModal } from '../../components/rooms/AddJoinRoomModal';

export const Dashboard = () => {
  const { user } = useAuth();
  const {
    rooms,
    isAddRoomModalOpen,
    addRoomModalTab,
    openAddRoomModal,
    closeAddRoomModal,
  } = useApp();

  const userName = user?.fullName || user?.name || user?.username || 'Scholar';

  return (
    <div className="space-y-6">
      {/* Workspace Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2E6EE]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">
            Welcome back, {userName}
          </h1>
          <p className="text-xs text-[#5B6475] mt-0.5">
            {user?.department || 'University Scholar'} • {user?.university || 'University Workspace'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            icon={LogIn}
            onClick={() => openAddRoomModal('join')}
          >
            Join Room
          </Button>

          <Button
            variant="accent"
            size="sm"
            icon={Plus}
            onClick={() => openAddRoomModal('create')}
          >
            Create Room
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      {rooms.length === 0 ? (
        /* Clean Empty State as explicitly specified */
        <div className="py-8">
          <div className="rounded-lg border border-dashed border-[#E2E6EE] bg-white p-8 sm:p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-lg bg-[#F7F8FA] border border-[#E2E6EE] text-[#5B6475] flex items-center justify-center mx-auto mb-4">
              <DoorOpen className="w-6 h-6 text-[#3157D5]" />
            </div>

            <h3 className="text-base font-bold text-[#172033]">
              You haven't joined any room yet.
            </h3>
            <p className="text-xs text-[#5B6475] mt-1.5 max-w-sm mx-auto leading-relaxed">
              Create a new course or departmental space, or enter a room code provided by your instructor or peer.
            </p>

            {/* Large Add Button with two actions */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <Button
                variant="accent"
                size="md"
                icon={PlusCircle}
                onClick={() => openAddRoomModal('create')}
                className="w-full sm:w-auto"
              >
                Create Room
              </Button>

              <Button
                variant="secondary"
                size="md"
                icon={LogIn}
                onClick={() => openAddRoomModal('join')}
                className="w-full sm:w-auto"
              >
                Join Room
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Populated Dashboard with Room Cards Grid */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider">
                My Enrolled Spaces
              </h2>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-[#F7F8FA] border border-[#E2E6EE] text-[#5B6475]">
                {rooms.length}
              </span>
            </div>

            <Link
              to="/rooms"
              className="text-xs font-semibold text-[#3157D5] hover:text-[#172033] inline-flex items-center gap-1 transition-colors"
            >
              <span>View All Rooms</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <RoomCard key={room.id || room.code} room={room} />
            ))}
          </div>
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

export default Dashboard;

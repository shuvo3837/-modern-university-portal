import React from 'react';
import { RoomCard } from './RoomCard';

export const RoomList = ({ rooms = [], emptyMessage = 'No rooms available yet.' }) => {
  if (rooms.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-300 bg-white">
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <RoomCard key={room.id || room._id || room.code} room={room} />
      ))}
    </div>
  );
};

export default RoomList;

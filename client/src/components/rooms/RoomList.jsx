import React from 'react';
import { RoomCard } from './RoomCard';

export const RoomList = ({ rooms = [], emptyMessage = 'No rooms available yet.' }) => {
  if (rooms.length === 0) {
    return (
      <div className="warm-sheet text-center">
        <p className="type-14">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="meeting-board">
      <div className="meeting-grid">
        {rooms.map((room) => (
          <RoomCard key={room.id || room._id || room.code} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomList;

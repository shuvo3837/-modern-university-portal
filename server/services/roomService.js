import Room from '../models/Room.js';
import RoomMember from '../models/RoomMember.js';
import RoomRequest from '../models/RoomRequest.js';
import { generateRoomCode } from '../utils/generateRoomCode.js';

export const createNewRoom = async (roomData, userId) => {
  const code = roomData.code ? roomData.code.toUpperCase() : generateRoomCode();

  const existing = await Room.findOne({ code });
  if (existing) {
    throw new Error('A room with this code already exists. Please choose another code.');
  }

  const room = await Room.create({
    ...roomData,
    code,
    admin: userId,
  });

  // Automatically add creator as Admin member
  await RoomMember.create({
    room: room._id,
    user: userId,
    role: 'Admin',
  });

  return room;
};

export const joinRoom = async (identifier, userId) => {
  const query = identifier.roomCode
    ? { code: identifier.roomCode.toUpperCase() }
    : { _id: identifier.roomId };

  const room = await Room.findOne(query);
  if (!room) {
    throw new Error('Room not found with the provided code/ID');
  }

  const isMember = await RoomMember.findOne({ room: room._id, user: userId });
  if (isMember) {
    return { status: 'already_member', room };
  }

  if (room.accessType === 'Private') {
    throw new Error('This room is private and cannot be joined without a direct invitation.');
  }

  if (room.accessType === 'Request approval') {
    const existingRequest = await RoomRequest.findOne({ room: room._id, user: userId });
    if (existingRequest && existingRequest.status === 'Pending') {
      return { status: 'request_pending', room };
    }
    await RoomRequest.create({ room: room._id, user: userId });
    return { status: 'request_submitted', room };
  }

  // Anyone can join
  await RoomMember.create({
    room: room._id,
    user: userId,
    role: 'Member',
  });

  return { status: 'joined', room };
};

export const getUserRooms = async (userId) => {
  const memberships = await RoomMember.find({ user: userId }).populate('room');
  return memberships.map((m) => m.room).filter(Boolean);
};

export default {
  createNewRoom,
  joinRoom,
  getUserRooms,
};

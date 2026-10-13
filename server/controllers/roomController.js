import Room from '../models/Room.js';
import RoomMember from '../models/RoomMember.js';
import roomService from '../services/roomService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const createRoom = async (req, res, next) => {
  try {
    const room = await roomService.createNewRoom(req.body, req.user._id);
    return successResponse(res, room, 'Room created successfully', 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const getMyRooms = async (req, res, next) => {
  try {
    const rooms = await roomService.getUserRooms(req.user._id);
    return successResponse(res, rooms, 'User rooms fetched');
  } catch (err) {
    next(err);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const { type, search } = req.query;
    const query = { isArchived: false };

    if (type && type !== 'ALL') query.type = type;
    if (search) query.name = { $regex: search, $options: 'i' };

    const rooms = await Room.find(query).populate('admin', 'name email').limit(50);
    return successResponse(res, rooms, 'Rooms directory fetched');
  } catch (err) {
    next(err);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate('admin', 'name email');
    if (!room) {
      return errorResponse(res, 'Room not found', 404);
    }
    return successResponse(res, room, 'Room details fetched');
  } catch (err) {
    next(err);
  }
};

export const joinRoom = async (req, res, next) => {
  try {
    const result = await roomService.joinRoom(req.body, req.user._id);
    return successResponse(res, result, 'Room join request processed');
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const getRoomMembers = async (req, res, next) => {
  try {
    const members = await RoomMember.find({ room: req.params.id }).populate('user', 'name username role email');
    return successResponse(res, members, 'Room members fetched');
  } catch (err) {
    next(err);
  }
};

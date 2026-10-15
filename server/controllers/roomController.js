import Room from '../models/Room.js';
import RoomMember from '../models/RoomMember.js';
import RoomRequest from '../models/RoomRequest.js';
import roomService from '../services/roomService.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * POST /api/rooms
 * Create room with role permission validation
 */
export const createRoom = async (req, res, next) => {
  try {
    const room = await roomService.createRoom(req.body, req.user);
    return res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rooms
 * List rooms (with optional filters: type, search, myRooms)
 */
export const getRooms = async (req, res, next) => {
  try {
    const { type, search, myRooms } = req.query;
    let query = { isActive: true };

    if (myRooms === 'true' && req.user) {
      const memberships = await RoomMember.find({ user: req.user.id }).select('room');
      const roomIds = memberships.map((m) => m.room);
      query._id = { $in: roomIds };
    }

    if (type && type.toLowerCase() !== 'all') {
      query.type = type.toLowerCase();
    }

    if (search && search.trim()) {
      query.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { code: { $regex: search.trim().toUpperCase(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    const rooms = await Room.find(query)
      .populate('admin', 'username email role')
      .populate('parentRoom', 'name code')
      .sort({ createdAt: -1 });

    // Attach member count to each room
    const roomsWithCounts = await Promise.all(
      rooms.map(async (room) => {
        const count = await RoomMember.countDocuments({ room: room._id });
        const obj = room.toJSON();
        obj.memberCount = count;
        return obj;
      })
    );

    return successResponse(res, roomsWithCounts, 'Rooms list fetched successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rooms/:roomId
 * Get detailed room info including admin & member count
 */
export const getRoomById = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    let room = null;

    if (roomId.match(/^[0-9a-fA-F]{24}$/)) {
      room = await Room.findById(roomId).populate('admin', 'username email role');
    } else {
      room = await Room.findOne({ code: roomId.toUpperCase() }).populate('admin', 'username email role');
    }

    if (!room) {
      return errorResponse(res, 'Room not found.', 404);
    }

    const memberCount = await RoomMember.countDocuments({ room: room._id });
    const isMember = req.user
      ? await RoomMember.findOne({ room: room._id, user: req.user.id })
      : null;

    const data = room.toJSON();
    data.memberCount = memberCount;
    data.currentUserRole = isMember ? isMember.role : null;

    return successResponse(res, data, 'Room details retrieved');
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/rooms/:roomId
 * Update room details (admin only)
 */
export const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return errorResponse(res, 'Room not found.', 404);
    }

    // Verify user is room admin or university admin
    const member = await RoomMember.findOne({ room: room._id, user: req.user.id });
    if (!member || member.role !== 'admin') {
      if (req.user.role !== 'university_admin') {
        return errorResponse(res, 'Only the room administrator can edit this workspace.', 403);
      }
    }

    const { name, description, accessType, parentRoom, isActive } = req.body;
    if (name) room.name = name.trim();
    if (description !== undefined) room.description = description;
    if (accessType) room.accessType = accessType.toLowerCase();
    if (parentRoom !== undefined) room.parentRoom = parentRoom || null;
    if (isActive !== undefined) room.isActive = isActive;

    await room.save();
    return successResponse(res, room, 'Room updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/rooms/:roomId
 * Soft or hard delete room
 */
export const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return errorResponse(res, 'Room not found.', 404);
    }

    if (room.admin.toString() !== req.user.id && req.user.role !== 'university_admin') {
      return errorResponse(res, 'Unauthorized to delete this room.', 403);
    }

    room.isActive = false;
    await room.save();

    return successResponse(res, { deleted: true }, 'Room archived successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/rooms/join
 * Join room using room code
 */
export const joinRoom = async (req, res, next) => {
  try {
    const { code, roomCode } = req.body;
    const finalCode = code || roomCode;
    const result = await roomService.joinRoomByCode(finalCode, req.user);
    return successResponse(res, result, result.message);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/rooms/:roomId/request
 * Explicit join request for a known room ID
 */
export const requestJoinRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) return errorResponse(res, 'Room not found.', 404);

    const result = await roomService.joinRoomByCode(room.code, req.user);
    return successResponse(res, result, result.message);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rooms/:roomId/requests
 * View pending join requests (Admin/Moderator only)
 */
export const getRoomRequests = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const member = await RoomMember.findOne({ room: roomId, user: req.user.id });
    if (!member || !['admin', 'moderator'].includes(member.role)) {
      return errorResponse(res, 'Access denied. Only room admins can view requests.', 403);
    }

    const requests = await RoomRequest.find({ room: roomId, status: 'pending' })
      .populate('user', 'username email role')
      .sort({ createdAt: -1 });

    return successResponse(res, requests, 'Pending join requests retrieved');
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/rooms/:roomId/requests/:requestId
 * Approve or reject join request
 */
export const handleRoomRequest = async (req, res, next) => {
  try {
    const { roomId, requestId } = req.params;
    const { action } = req.body; // 'approve' or 'reject'

    if (!['approve', 'reject'].includes(action)) {
      return errorResponse(res, "Action must be 'approve' or 'reject'.", 400);
    }

    const result = await roomService.approveOrRejectRequest(roomId, requestId, action, req.user);
    return successResponse(
      res,
      result,
      `Join request ${action === 'approve' ? 'approved' : 'rejected'} successfully`
    );
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rooms/:roomId/members
 * List all members of a room
 */
export const getRoomMembers = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const members = await RoomMember.find({ room: roomId })
      .populate('user', 'username email role createdAt')
      .sort({ joinedAt: 1 });

    return successResponse(res, members, 'Room members list retrieved');
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rooms/my
 * Retrieve all rooms where currently authenticated user is a member or admin
 */
export const getMyRooms = async (req, res, next) => {
  try {
    req.query.myRooms = 'true';
    return getRooms(req, res, next);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/rooms/:roomId/members/:userId
 * Remove a member from a room (Admin or self-leave)
 */
export const removeRoomMember = async (req, res, next) => {
  try {
    const { roomId, userId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) {
      return errorResponse(res, 'Room not found.', 404);
    }

    const requesterMember = await RoomMember.findOne({ room: roomId, user: req.user.id });
    const isRoomAdmin = requesterMember && requesterMember.role === 'admin';
    const isSelf = req.user.id === userId;

    if (!isRoomAdmin && !isSelf && req.user.role !== 'university_admin') {
      return errorResponse(res, 'Only room administrators or the member themselves can leave or remove membership.', 403);
    }

    const removed = await RoomMember.findOneAndDelete({ room: roomId, user: userId });
    if (!removed) {
      return errorResponse(res, 'Member not enrolled in this room.', 404);
    }

    return successResponse(res, { removed: true }, 'Member removed successfully from room');
  } catch (error) {
    next(error);
  }
};

export default {
  createRoom,
  getRooms,
  getMyRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  joinRoom,
  requestJoinRoom,
  getRoomRequests,
  handleRoomRequest,
  getRoomMembers,
  removeRoomMember,
};

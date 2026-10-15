import Room from '../models/Room.js';
import RoomMember from '../models/RoomMember.js';
import RoomRequest from '../models/RoomRequest.js';
import Notification from '../models/Notification.js';
import { generateRoomCode } from '../utils/generateRoomCode.js';

export const verifyCreateRoomPermission = (userRole, roomType) => {
  const role = (userRole || 'student').toLowerCase();
  const type = (roomType || 'personal').toLowerCase();

  if (type === 'personal' || type === 'custom') {
    return true; // Any authenticated user
  }

  if (type === 'course') {
    if (['teacher', 'department_head', 'university_admin'].includes(role)) return true;
    throw new Error('Only faculty, teachers, or administrators can create Course rooms.');
  }

  if (type === 'department') {
    if (['department_head', 'university_admin'].includes(role)) return true;
    throw new Error('Only Department Heads or University Admins can create Department rooms.');
  }

  if (type === 'university') {
    if (role === 'university_admin') return true;
    throw new Error('Only University Admins can create University-wide rooms.');
  }

  return true;
};

export const createRoom = async (roomData, user) => {
  const type = (roomData.type || 'personal').toLowerCase();
  const accessType = (roomData.accessType || 'public').toLowerCase();

  // Enforce backend role-based permissions
  verifyCreateRoomPermission(user.role, type);

  // Generate unique code if not provided
  let code = roomData.code ? roomData.code.trim().toUpperCase() : null;
  if (code) {
    const existing = await Room.findOne({ code });
    if (existing) {
      throw new Error(`A room with code '${code}' already exists. Please choose a different code.`);
    }
  } else {
    let attempts = 0;
    while (!code && attempts < 10) {
      attempts++;
      const generated = generateRoomCode(roomData.name ? roomData.name.split(' ')[0] : 'ROOM');
      const collision = await Room.findOne({ code: generated });
      if (!collision) code = generated;
    }
  }

  const room = await Room.create({
    name: roomData.name.trim(),
    description: roomData.description || '',
    type,
    accessType,
    code,
    admin: user.id,
    university: roomData.university || 'Metropolitan University',
    department: roomData.department || 'Department of CSE',
    parentRoom: roomData.parentRoom || null,
    isActive: true,
  });

  // Creator automatically joins as admin member
  await RoomMember.create({
    room: room._id,
    user: user.id,
    role: 'admin',
  });

  return room;
};

export const joinRoomByCode = async (code, user) => {
  const cleanCode = code.trim().toUpperCase();

  const room = await Room.findOne({ code: cleanCode, isActive: true });
  if (!room) {
    const err = new Error(`No active room found with code '${cleanCode}'.`);
    err.statusCode = 404;
    throw err;
  }

  // Check existing membership
  const existingMember = await RoomMember.findOne({ room: room._id, user: user.id });
  if (existingMember) {
    return {
      status: 'already_member',
      message: 'You are already an enrolled member of this room.',
      room,
      member: existingMember,
    };
  }

  // Handle Private access type
  if (room.accessType === 'private') {
    const err = new Error('This room is private and cannot be joined without a direct invitation.');
    err.statusCode = 403;
    throw err;
  }

  // Handle Approval access type
  if (room.accessType === 'approval') {
    const existingRequest = await RoomRequest.findOne({
      room: room._id,
      user: user.id,
      status: 'pending',
    });

    if (existingRequest) {
      return {
        status: 'pending',
        message: 'Request Sent — waiting for room administrator approval.',
        room,
        request: existingRequest,
      };
    }

    const request = await RoomRequest.create({
      room: room._id,
      user: user.id,
      status: 'pending',
      message: `Join request from ${user.username}`,
    });

    // Notify room admin
    await Notification.create({
      recipient: room.admin,
      sender: user.id,
      type: 'room_request',
      title: 'Room Access Request',
      message: `${user.username} requested to join ${room.name}.`,
      referenceId: request._id.toString(),
    });

    return {
      status: 'pending',
      message: 'Request Sent — waiting for room administrator approval.',
      room,
      request,
    };
  }

  // Public access type -> join immediately
  const member = await RoomMember.create({
    room: room._id,
    user: user.id,
    role: 'member',
  });

  return {
    status: 'joined',
    message: 'Successfully enrolled into room.',
    room,
    member,
  };
};

export const approveOrRejectRequest = async (roomId, requestId, action, reviewerUser) => {
  const room = await Room.findById(roomId);
  if (!room) {
    const err = new Error('Room not found.');
    err.statusCode = 404;
    throw err;
  }

  // Check if reviewer is admin or moderator
  const reviewerMember = await RoomMember.findOne({ room: roomId, user: reviewerUser.id });
  if (!reviewerMember || !['admin', 'moderator'].includes(reviewerMember.role)) {
    const err = new Error('Only room administrators or moderators can review join requests.');
    err.statusCode = 403;
    throw err;
  }

  const request = await RoomRequest.findOne({ _id: requestId, room: roomId, status: 'pending' });
  if (!request) {
    const err = new Error('Pending join request not found.');
    err.statusCode = 404;
    throw err;
  }

  if (action === 'approve') {
    request.status = 'approved';
    request.reviewedBy = reviewerUser.id;
    request.reviewedAt = new Date();
    await request.save();

    // Create room membership if not already present
    await RoomMember.findOneAndUpdate(
      { room: roomId, user: request.user },
      { $set: { role: 'member', joinedAt: new Date() } },
      { upsert: true, new: true }
    );

    // Notify user
    await Notification.create({
      recipient: request.user,
      sender: reviewerUser.id,
      type: 'request_approved',
      title: 'Join Request Approved',
      message: `Your request was approved. You can now access ${room.name}.`,
      referenceId: room._id.toString(),
    });

    return { request, status: 'approved' };
  } else {
    request.status = 'rejected';
    request.reviewedBy = reviewerUser.id;
    request.reviewedAt = new Date();
    await request.save();

    // Notify user
    await Notification.create({
      recipient: request.user,
      sender: reviewerUser.id,
      type: 'request_rejected',
      title: 'Join Request Declined',
      message: `Your request to join ${room.name} was declined.`,
      referenceId: room._id.toString(),
    });

    return { request, status: 'rejected' };
  }
};

export default {
  verifyCreateRoomPermission,
  createRoom,
  joinRoomByCode,
  approveOrRejectRequest,
};

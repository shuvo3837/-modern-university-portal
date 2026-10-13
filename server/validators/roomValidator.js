import { errorResponse } from '../utils/response.js';

export const validateRoomInput = (req, res, next) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return errorResponse(res, 'Room name is required', 400);
  }
  next();
};

export const validateJoinRoomInput = (req, res, next) => {
  const { roomCode, roomId } = req.body;
  if (!roomCode && !roomId) {
    return errorResponse(res, 'Either roomCode or roomId is required to join a room', 400);
  }
  next();
};

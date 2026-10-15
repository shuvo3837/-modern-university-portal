import { errorResponse } from '../utils/response.js';

export const validateRoomCreate = (req, res, next) => {
  const { name, type, accessType } = req.body;
  const errors = [];

  if (!name || !name.trim()) {
    errors.push({ field: 'name', message: 'Room name is required' });
  }

  const validTypes = ['university', 'department', 'course', 'personal', 'custom'];
  if (type && !validTypes.includes(type.toLowerCase())) {
    errors.push({
      field: 'type',
      message: `Invalid room type. Allowed types: ${validTypes.join(', ')}`,
    });
  }

  const validAccessTypes = ['public', 'approval', 'private'];
  if (accessType && !validAccessTypes.includes(accessType.toLowerCase())) {
    errors.push({
      field: 'accessType',
      message: `Invalid access type. Allowed types: ${validAccessTypes.join(', ')}`,
    });
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Validation failed for room creation', 400, errors);
  }

  next();
};

export const validateRoomJoin = (req, res, next) => {
  const { code, roomCode } = req.body;
  const finalCode = code || roomCode;

  if (!finalCode || !finalCode.trim()) {
    return errorResponse(res, 'Room code is required to join a room', 400, [
      { field: 'code', message: 'Room code is required' },
    ]);
  }

  next();
};

export default {
  validateRoomCreate,
  validateRoomJoin,
};

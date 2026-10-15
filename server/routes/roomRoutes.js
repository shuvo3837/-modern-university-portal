import express from 'express';
import {
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
} from '../controllers/roomController.js';
import { createPost, getRoomPosts } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRoomCreate, validateRoomJoin } from '../validators/roomValidator.js';

const router = express.Router();

// General room operations
router.post('/', protect, validateRoomCreate, createRoom);
router.get('/', protect, getRooms);
router.get('/my', protect, getMyRooms);
router.post('/join', protect, validateRoomJoin, joinRoom);

// Single room operations
router.get('/:roomId', protect, getRoomById);
router.put('/:roomId', protect, updateRoom);
router.delete('/:roomId', protect, deleteRoom);

// Join request operations
router.post('/:roomId/request', protect, requestJoinRoom);
router.get('/:roomId/requests', protect, getRoomRequests);
router.put('/:roomId/requests/:requestId', protect, handleRoomRequest);
router.post('/:roomId/requests/:requestId/approve', protect, (req, res, next) => {
  req.body = { ...req.body, action: 'approve' };
  return handleRoomRequest(req, res, next);
});
router.post('/:roomId/requests/:requestId/reject', protect, (req, res, next) => {
  req.body = { ...req.body, action: 'reject' };
  return handleRoomRequest(req, res, next);
});

// Members
router.get('/:roomId/members', protect, getRoomMembers);
router.delete('/:roomId/members/:userId', protect, removeRoomMember);

// Posts inside room
router.post('/:roomId/posts', protect, createPost);
router.get('/:roomId/posts', protect, getRoomPosts);

export default router;

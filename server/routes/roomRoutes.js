import express from 'express';
import {
  createRoom,
  getMyRooms,
  getAllRooms,
  getRoomById,
  joinRoom,
  getRoomMembers,
} from '../controllers/roomController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRoomInput, validateJoinRoomInput } from '../validators/roomValidator.js';

const router = express.Router();

router.get('/', protect, getAllRooms);
router.post('/', protect, validateRoomInput, createRoom);
router.get('/my-rooms', protect, getMyRooms);
router.post('/join', protect, validateJoinRoomInput, joinRoom);
router.get('/:id', protect, getRoomById);
router.get('/:id/members', protect, getRoomMembers);

export default router;

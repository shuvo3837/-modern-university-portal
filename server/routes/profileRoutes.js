import express from 'express';
import {
  getMyProfile,
  getProfileByUsername,
  updateMyProfile,
} from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateProfileUpdate } from '../validators/profileValidator.js';

const router = express.Router();

router.get('/me', protect, getMyProfile);
router.put('/me', protect, validateProfileUpdate, updateMyProfile);
router.get('/:username', protect, getProfileByUsername);

export default router;

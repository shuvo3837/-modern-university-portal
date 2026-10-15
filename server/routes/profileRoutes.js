import express from 'express';
import {
  getMyProfile,
  updateMyProfile,
  getProfileByUsername,
} from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateProfileUpdate } from '../validators/profileValidator.js';

const router = express.Router();

router.get('/me', protect, getMyProfile);
router.put('/me', protect, validateProfileUpdate, updateMyProfile);
router.get('/:username', getProfileByUsername);

export default router;

import express from 'express';
import {
  createSchedule,
  getSchedules,
  getMySchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} from '../controllers/scheduleController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateScheduleCreate } from '../validators/scheduleValidator.js';

const router = express.Router();

router.post('/', protect, validateScheduleCreate, createSchedule);
router.get('/', protect, getSchedules);
router.get('/my', protect, getMySchedules);
router.get('/:id', protect, getScheduleById);
router.put('/:id', protect, updateSchedule);
router.delete('/:id', protect, deleteSchedule);

export default router;

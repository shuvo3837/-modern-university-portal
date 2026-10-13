import express from 'express';
import { getPeople, getTeachers, getUserById } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/people', protect, getPeople);
router.get('/teachers', protect, getTeachers);
router.get('/teachers/:id', protect, getUserById);
router.get('/:id', protect, getUserById);

export default router;

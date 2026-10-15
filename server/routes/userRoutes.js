import express from 'express';
import { getUsers, getTeachers, getUserById } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/teachers', getTeachers);
router.get('/:id', getUserById);

export default router;

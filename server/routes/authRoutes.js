import express from 'express';
import { login, signup, getMe } from '../controllers/authController.js';
import { validateLoginInput, validateSignupInput } from '../validators/authValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', validateLoginInput, login);
router.post('/signup', validateSignupInput, signup);
router.get('/me', protect, getMe);

export default router;

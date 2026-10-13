import User from '../models/User.js';
import Profile from '../models/Profile.js';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async (userData) => {
  const { name, username, email, password, role, bio, department, university } = userData;

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error('An account with this email already exists');
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new Error('Username is already taken');
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
    role: role || 'Student',
  });

  // Create initial profile for user
  const profile = await Profile.create({
    user: user._id,
    bio: bio || '',
  });

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export default {
  registerUser,
  authenticateUser,
};

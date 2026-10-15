import User from '../models/User.js';
import Profile from '../models/Profile.js';
import { generateToken } from '../utils/generateToken.js';

export const register = async (userData) => {
  const { username, email, password, role } = userData;

  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();

  // Check duplicate username
  const existingUsername = await User.findOne({ username: normalizedUsername });
  if (existingUsername) {
    const err = new Error('Username already exists.');
    err.statusCode = 409;
    throw err;
  }

  // Check duplicate email
  const existingEmail = await User.findOne({ email: normalizedEmail });
  if (existingEmail) {
    const err = new Error('Email already exists.');
    err.statusCode = 409;
    throw err;
  }

  // Create User
  const user = await User.create({
    username: normalizedUsername,
    email: normalizedEmail,
    password,
    role: (role || 'student').toLowerCase(),
    isActive: true,
  });

  // Create default Profile automatically
  const formattedName =
    normalizedUsername.charAt(0).toUpperCase() + normalizedUsername.slice(1);
  await Profile.create({
    user: user._id,
    fullName: formattedName,
    university: 'Metropolitan University',
    department: 'Department of CSE',
  });

  const token = generateToken(user._id, user.role);

  return {
    token,
    user: {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};

export const login = async (identifier, password) => {
  const cleanId = identifier.trim().toLowerCase();

  // Query user by email OR username, explicitly select password
  const user = await User.findOne({
    $or: [{ email: cleanId }, { username: cleanId }],
  }).select('+password');

  if (!user) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  if (!user.isActive) {
    const err = new Error('Account has been deactivated. Please contact campus admin.');
    err.statusCode = 403;
    throw err;
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken(user._id, user.role);

  return {
    token,
    user: {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    const err = new Error('User session not found.');
    err.statusCode = 404;
    throw err;
  }

  const profile = await Profile.findOne({ user: user._id });

  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    profile: profile || null,
  };
};

export default {
  register,
  login,
  getCurrentUser,
};

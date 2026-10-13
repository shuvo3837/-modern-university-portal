import Profile from '../models/Profile.js';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getMyProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id }).populate('user', '-password');
    if (!profile) {
      profile = await Profile.create({ user: req.user._id });
    }
    return successResponse(res, profile, 'Profile retrieved');
  } catch (err) {
    next(err);
  }
};

export const getProfileByUsername = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password');
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    const profile = await Profile.findOne({ user: user._id });
    return successResponse(res, { user, profile }, 'Public profile retrieved');
  } catch (err) {
    next(err);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const { bio, title, office, officeHours, enrollmentId, avatarUrl } = req.body;
    let profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { bio, title, office, officeHours, enrollmentId, avatarUrl },
      { new: true, upsert: true }
    );
    return successResponse(res, profile, 'Profile updated successfully');
  } catch (err) {
    next(err);
  }
};

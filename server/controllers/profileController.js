import Profile from '../models/Profile.js';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * GET /api/profile/me
 * Retrieve currently authenticated user's own profile
 */
export const getMyProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate('user', 'username email role createdAt');

    if (!profile) {
      profile = await Profile.create({
        user: req.user.id,
        fullName: req.user.username,
      });
    }

    return successResponse(res, profile, 'Profile retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/profile/me
 * Update authenticated user's profile
 */
export const updateMyProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      'fullName',
      'profileImage',
      'contact',
      'university',
      'department',
      'designation',
      'bio',
      'researchInterests',
      'courses',
      'officeLocation',
      'linkedin',
      'profileVisibility',
      'contactVisibility',
    ];

    const updates = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: updates },
      { new: true, upsert: true, runValidators: true }
    ).populate('user', 'username email role');

    return successResponse(res, profile, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/profile/:username
 * Public profile lookup respecting profileVisibility and contactVisibility
 */
export const getProfileByUsername = async (req, res, next) => {
  try {
    const cleanUsername = req.params.username.trim().toLowerCase();

    const user = await User.findOne({ username: cleanUsername, isActive: true }).select('username role createdAt');
    if (!user) {
      return errorResponse(res, 'Scholar profile not found.', 404);
    }

    const profile = await Profile.findOne({ user: user._id });
    if (!profile) {
      return errorResponse(res, 'Profile details not found.', 404);
    }

    // Check if the viewer is the owner
    const isOwner = req.user && req.user.id === user._id.toString();

    if (!isOwner && profile.profileVisibility === 'private') {
      return errorResponse(res, 'This profile is set to private by the scholar.', 403);
    }

    const publicData = {
      id: profile.id,
      username: user.username,
      role: user.role,
      fullName: profile.fullName || user.username,
      profileImage: profile.profileImage,
      university: profile.university,
      department: profile.department,
      designation: profile.designation,
      bio: profile.bio,
      researchInterests: profile.researchInterests,
      courses: profile.courses,
      officeLocation: profile.officeLocation,
      linkedin: profile.linkedin,
      createdAt: user.createdAt,
    };

    // Obey contactVisibility for sensitive contact details
    if (isOwner || profile.contactVisibility === 'public' || (profile.contactVisibility === 'university' && req.user)) {
      publicData.contact = profile.contact;
    } else {
      publicData.contact = 'Restricted by privacy settings';
    }

    return successResponse(res, publicData, 'Public profile retrieved');
  } catch (error) {
    next(error);
  }
};

export default {
  getMyProfile,
  updateMyProfile,
  getProfileByUsername,
};

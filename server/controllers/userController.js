import User from '../models/User.js';
import Profile from '../models/Profile.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getPeople = async (req, res, next) => {
  try {
    const { role, search } = req.query;
    const query = { isActive: true };

    if (role && role !== 'ALL') {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(query).select('-password').limit(50);
    return successResponse(res, users, 'People directory fetched');
  } catch (err) {
    next(err);
  }
};

export const getTeachers = async (req, res, next) => {
  try {
    const teachers = await User.find({
      role: { $in: ['Teacher', 'Department Head'] },
      isActive: true,
    }).select('-password');

    return successResponse(res, teachers, 'Faculty members fetched');
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    const profile = await Profile.findOne({ user: user._id });
    return successResponse(res, { user, profile }, 'User details retrieved');
  } catch (err) {
    next(err);
  }
};

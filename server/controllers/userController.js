import User from '../models/User.js';
import Profile from '../models/Profile.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * GET /api/users
 * Search and filter campus scholars, faculty, and departments
 */
export const getUsers = async (req, res, next) => {
  try {
    const { search, role, department } = req.query;

    let userQuery = { isActive: true };

    if (role && role.toLowerCase() !== 'all') {
      const cleanRole = role.toLowerCase().trim();
      if (cleanRole === 'faculty' || cleanRole === 'teachers') {
        userQuery.role = { $in: ['teacher', 'department_head'] };
      } else if (cleanRole === 'students') {
        userQuery.role = 'student';
      } else {
        userQuery.role = cleanRole;
      }
    }

    if (search && search.trim()) {
      userQuery.$or = [
        { username: { $regex: search.trim(), $options: 'i' } },
        { email: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    const users = await User.find(userQuery).select('-password').limit(100);

    // Fetch corresponding profiles
    const userIds = users.map((u) => u._id);
    let profileQuery = { user: { $in: userIds } };

    if (department && department.toLowerCase() !== 'all') {
      profileQuery.department = { $regex: department.trim(), $options: 'i' };
    }

    const profiles = await Profile.find(profileQuery);
    const profileMap = new Map();
    profiles.forEach((p) => profileMap.set(p.user.toString(), p));

    // Combine user & profile data
    let combined = users
      .filter((u) => {
        // If department was filtered, ensure user has matching profile
        if (department && department.toLowerCase() !== 'all') {
          return profileMap.has(u._id.toString());
        }
        return true;
      })
      .map((u) => {
        const p = profileMap.get(u._id.toString()) || {};
        return {
          id: u._id.toString(),
          username: u.username,
          email: u.email,
          role: u.role,
          name: p.fullName || u.username,
          fullName: p.fullName || u.username,
          profileImage: p.profileImage || '',
          university: p.university || 'Metropolitan University',
          department: p.department || 'Department of CSE',
          designation: p.designation || (u.role === 'teacher' ? 'Professor' : 'Scholar'),
          bio: p.bio || '',
          contact: p.contact || '',
          officeLocation: p.officeLocation || '',
          courses: p.courses || [],
          researchInterests: p.researchInterests || [],
          availability: 'Available',
        };
      });

    return successResponse(res, combined, 'Campus directory fetched successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/users/teachers
 * Retrieve all teacher and department head profiles
 */
export const getTeachers = async (req, res, next) => {
  req.query.role = 'teachers';
  return getUsers(req, res, next);
};

/**
 * GET /api/users/:idOrUsername
 * Retrieve individual user by ObjectId or username
 */
export const getUserById = async (req, res, next) => {
  try {
    const identifier = req.params.id;
    let user = null;

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(identifier).select('-password');
    } else {
      user = await User.findOne({ username: identifier.toLowerCase().trim() }).select('-password');
    }

    if (!user) {
      return errorResponse(res, 'User not found.', 404);
    }
    const profile = await Profile.findOne({ user: user._id });

    return successResponse(res, { user, profile }, 'User details retrieved');
  } catch (error) {
    next(error);
  }
};

export default {
  getUsers,
  getTeachers,
  getUserById,
};

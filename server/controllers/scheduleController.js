import Schedule from '../models/Schedule.js';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * Filter schedule event based on viewer's identity and role
 * Backend-enforced privacy logic:
 * - Owner/Admin sees complete title and details.
 * - If visibility is 'private':
 *     - Teachers/Department Head see 'Meeting' or 'Confidential Academic Session'.
 *     - Students see 'Busy' with masked location and description.
 * - If visibility is 'teachers' and viewer is student:
 *     - Title is masked as 'Busy'.
 */
export const applySchedulePrivacy = (event, viewerUser) => {
  const isOwner = viewerUser && event.user.toString() === viewerUser.id;
  const isUniversityAdmin = viewerUser && viewerUser.role === 'university_admin';

  if (isOwner || isUniversityAdmin) {
    return event;
  }

  const viewerRole = viewerUser ? viewerUser.role : 'guest';
  const plain = event.toJSON ? event.toJSON() : { ...event };

  if (plain.visibility === 'private') {
    if (viewerRole === 'student' || viewerRole === 'guest') {
      plain.title = 'Busy';
      plain.location = 'Reserved';
      plain.description = 'Private scheduling block';
    } else {
      plain.title = 'Meeting';
      plain.description = 'Confidential Meeting';
    }
    return plain;
  }

  if (plain.visibility === 'teachers' && (viewerRole === 'student' || viewerRole === 'guest')) {
    plain.title = 'Busy';
    plain.location = 'Reserved';
    plain.description = 'Faculty Session';
    return plain;
  }

  return plain;
};

/**
 * POST /api/schedule
 * Create a new schedule event
 */
export const createSchedule = async (req, res, next) => {
  try {
    const {
      title,
      activityType,
      date,
      startTime,
      endTime,
      repeat,
      visibility,
      location,
      description,
      reminderMinutes,
    } = req.body;

    const event = await Schedule.create({
      user: req.user.id,
      title: title.trim(),
      activityType: (activityType || 'class').toLowerCase(),
      date,
      startTime,
      endTime,
      repeat: (repeat || 'none').toLowerCase(),
      visibility: (visibility || 'department').toLowerCase(),
      location: location || '',
      description: description || '',
      reminderMinutes: reminderMinutes !== undefined ? Number(reminderMinutes) : 15,
    });

    return res.status(201).json({
      success: true,
      message: 'Schedule event created successfully',
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/schedule
 * List schedules with privacy masking applied on backend
 */
export const getSchedules = async (req, res, next) => {
  try {
    const { userId, date, activityType } = req.query;
    let query = {};

    if (userId) {
      query.user = userId;
    }

    if (date) {
      query.date = date;
    }

    if (activityType) {
      query.activityType = activityType.toLowerCase();
    }

    const events = await Schedule.find(query)
      .populate('user', 'username email role')
      .sort({ date: 1, startTime: 1 });

    // Apply backend schedule privacy filtering
    const sanitizedEvents = events.map((evt) => applySchedulePrivacy(evt, req.user));

    return successResponse(res, sanitizedEvents, 'Schedule events fetched successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/schedule/:id
 * Retrieve single schedule event with privacy filter
 */
export const getScheduleById = async (req, res, next) => {
  try {
    const event = await Schedule.findById(req.params.id).populate('user', 'username email role');
    if (!event) {
      return errorResponse(res, 'Schedule event not found.', 404);
    }

    const sanitized = applySchedulePrivacy(event, req.user);
    return successResponse(res, sanitized, 'Schedule event retrieved');
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/schedule/:id
 * Update schedule event (Owner or Admin only)
 */
export const updateSchedule = async (req, res, next) => {
  try {
    const event = await Schedule.findById(req.params.id);
    if (!event) {
      return errorResponse(res, 'Schedule event not found.', 404);
    }

    if (event.user.toString() !== req.user.id && req.user.role !== 'university_admin') {
      return errorResponse(res, 'Unauthorized to modify this schedule event.', 403);
    }

    const allowed = [
      'title',
      'activityType',
      'date',
      'startTime',
      'endTime',
      'repeat',
      'visibility',
      'location',
      'description',
      'reminderMinutes',
    ];

    allowed.forEach((field) => {
      if (req.body[field] !== undefined) {
        event[field] = req.body[field];
      }
    });

    await event.save();
    return successResponse(res, event, 'Schedule event updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/schedule/:id
 * Delete schedule event (Owner or Admin only)
 */
export const deleteSchedule = async (req, res, next) => {
  try {
    const event = await Schedule.findById(req.params.id);
    if (!event) {
      return errorResponse(res, 'Schedule event not found.', 404);
    }

    if (event.user.toString() !== req.user.id && req.user.role !== 'university_admin') {
      return errorResponse(res, 'Unauthorized to delete this schedule event.', 403);
    }

    await Schedule.deleteOne({ _id: event._id });
    return successResponse(res, { deleted: true }, 'Schedule event deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/schedule/my
 * Retrieve schedules created by authenticated user
 */
export const getMySchedules = async (req, res, next) => {
  try {
    const events = await Schedule.find({ user: req.user.id })
      .populate('user', 'username email role')
      .sort({ date: 1, startTime: 1 });

    return successResponse(res, events, 'User personal schedules retrieved');
  } catch (error) {
    next(error);
  }
};

export default {
  createSchedule,
  getSchedules,
  getMySchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};

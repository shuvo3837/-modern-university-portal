import { errorResponse } from '../utils/response.js';

export const validateScheduleCreate = (req, res, next) => {
  const { title, date, startTime, endTime, activityType, visibility } = req.body;
  const errors = [];

  if (!title || !title.trim()) {
    errors.push({ field: 'title', message: 'Event title is required' });
  }

  if (!date) {
    errors.push({ field: 'date', message: 'Date is required' });
  }

  if (!startTime) {
    errors.push({ field: 'startTime', message: 'Start time is required' });
  }

  if (!endTime) {
    errors.push({ field: 'endTime', message: 'End time is required' });
  }

  const validTypes = ['class', 'meeting', 'consultation', 'research', 'available', 'other'];
  if (activityType && !validTypes.includes(activityType.toLowerCase())) {
    errors.push({
      field: 'activityType',
      message: `Invalid activity type. Allowed: ${validTypes.join(', ')}`,
    });
  }

  const validVisibilities = [
    'public',
    'university',
    'department',
    'teachers',
    'students',
    'selected',
    'private',
  ];
  if (visibility && !validVisibilities.includes(visibility.toLowerCase())) {
    errors.push({
      field: 'visibility',
      message: `Invalid visibility option. Allowed: ${validVisibilities.join(', ')}`,
    });
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Validation failed for schedule event', 400, errors);
  }

  next();
};

export default {
  validateScheduleCreate,
};

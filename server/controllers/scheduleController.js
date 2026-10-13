import scheduleService from '../services/scheduleService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getSchedules = async (req, res, next) => {
  try {
    const schedules = await scheduleService.getEventsForUser(req.user._id, req.query);
    return successResponse(res, schedules, 'Schedules fetched');
  } catch (err) {
    next(err);
  }
};

export const createSchedule = async (req, res, next) => {
  try {
    const schedule = await scheduleService.createScheduleEvent(req.body, req.user._id);
    return successResponse(res, schedule, 'Schedule created successfully', 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const updateSchedule = async (req, res, next) => {
  try {
    const schedule = await scheduleService.updateScheduleEvent(req.params.id, req.user._id, req.body);
    return successResponse(res, schedule, 'Schedule updated');
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const deleteSchedule = async (req, res, next) => {
  try {
    await scheduleService.deleteScheduleEvent(req.params.id, req.user._id);
    return successResponse(res, null, 'Schedule deleted');
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

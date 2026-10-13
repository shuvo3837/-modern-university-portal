import Schedule from '../models/Schedule.js';

export const createScheduleEvent = async (eventData, userId) => {
  return Schedule.create({
    ...eventData,
    creator: userId,
  });
};

export const getEventsForUser = async (userId, filters = {}) => {
  const query = { creator: userId, ...filters };
  return Schedule.find(query).sort({ date: 1, startTime: 1 });
};

export const updateScheduleEvent = async (scheduleId, userId, updateData) => {
  const event = await Schedule.findOne({ _id: scheduleId, creator: userId });
  if (!event) {
    throw new Error('Schedule event not found or unauthorized');
  }
  Object.assign(event, updateData);
  return event.save();
};

export const deleteScheduleEvent = async (scheduleId, userId) => {
  const event = await Schedule.findOneAndDelete({ _id: scheduleId, creator: userId });
  if (!event) {
    throw new Error('Schedule event not found or unauthorized');
  }
  return event;
};

export default {
  createScheduleEvent,
  getEventsForUser,
  updateScheduleEvent,
  deleteScheduleEvent,
};

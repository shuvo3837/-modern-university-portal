/**
 * Application Constants
 * University Workspace
 */

export const USER_ROLES = {
  STUDENT: 'Student',
  TEACHER: 'Teacher',
  DEPARTMENT_HEAD: 'Department Head',
  UNIVERSITY_ADMIN: 'University Admin',
};

export const ROOM_TYPES = {
  UNIVERSITY: 'University',
  DEPARTMENT: 'Department',
  COURSE: 'Course',
  PERSONAL: 'Personal',
  CUSTOM: 'Custom',
};

export const ROOM_ACCESS_TYPES = {
  PUBLIC: 'Anyone can join',
  APPROVAL: 'Request approval',
  PRIVATE: 'Private',
};

export const SCHEDULE_TYPES = {
  LECTURE: 'Lecture',
  LAB: 'Lab',
  SEMINAR: 'Seminar',
  OFFICE_HOURS: 'Office Hours',
  EXAM: 'Exam',
  MEETING: 'Meeting',
};

export const NOTIFICATION_TYPES = {
  ROOM_INVITE: 'room_invite',
  JOIN_REQUEST: 'join_request',
  ANNOUNCEMENT: 'announcement',
  SCHEDULE_UPDATE: 'schedule_update',
  SYSTEM: 'system',
};

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'uw_token',
  USER_DATA: 'uw_user',
};

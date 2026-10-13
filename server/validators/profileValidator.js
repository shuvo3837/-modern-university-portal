import { errorResponse } from '../utils/response.js';

export const validateProfileUpdate = (req, res, next) => {
  // Profiles can update bio, office, officeHours, etc.
  next();
};

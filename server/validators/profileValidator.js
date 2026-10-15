import { errorResponse } from '../utils/response.js';

export const validateProfileUpdate = (req, res, next) => {
  const { bio, profileVisibility, contactVisibility } = req.body;
  const errors = [];

  if (bio && bio.length > 1000) {
    errors.push({ field: 'bio', message: 'Bio cannot exceed 1000 characters' });
  }

  const validVisibilities = ['public', 'university', 'department', 'private'];

  if (profileVisibility && !validVisibilities.includes(profileVisibility.toLowerCase())) {
    errors.push({
      field: 'profileVisibility',
      message: `Invalid visibility option. Allowed: ${validVisibilities.join(', ')}`,
    });
  }

  if (contactVisibility && !validVisibilities.includes(contactVisibility.toLowerCase())) {
    errors.push({
      field: 'contactVisibility',
      message: `Invalid visibility option. Allowed: ${validVisibilities.join(', ')}`,
    });
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Validation failed for profile updates', 400, errors);
  }

  next();
};

export default {
  validateProfileUpdate,
};

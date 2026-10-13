import { errorResponse } from '../utils/response.js';

/**
 * Role-Based Access Control Middleware
 * Restricts access based on user role
 * @param  {...string} roles
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'User identity not found', 401);
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        `Forbidden: role '${req.user.role}' is not authorized to access this resource`,
        403
      );
    }

    next();
  };
};

export default authorize;

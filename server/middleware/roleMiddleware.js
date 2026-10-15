import { errorResponse } from '../utils/response.js';

/**
 * Role Authorization Middleware
 * Verifies that the authenticated user possesses one of the required roles
 * Usage: requireRole('teacher') or requireRole('teacher', 'department_head')
 * @param  {...string} roles
 */
export const requireRole = (...roles) => {
  const normalizedAllowedRoles = roles.map((r) => r.toLowerCase().trim());

  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required before role verification.', 401);
    }

    const userRole = (req.user.role || '').toLowerCase();

    if (!normalizedAllowedRoles.includes(userRole)) {
      return errorResponse(
        res,
        `Access denied. Required role: [${normalizedAllowedRoles.join(', ')}]. Current role: '${userRole}'.`,
        403
      );
    }

    next();
  };
};

export const authorize = requireRole;
export default requireRole;

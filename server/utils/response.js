/**
 * Standardized API Response Helpers
 */

export const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data: data !== null ? data : {},
  });
};

export const errorResponse = (res, message = 'An error occurred', statusCode = 500, errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors: Array.isArray(errors) ? errors : [errors].filter(Boolean),
  });
};

export default {
  successResponse,
  errorResponse,
};

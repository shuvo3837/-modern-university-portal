/**
 * General Helper Utilities
 */

/**
 * Format date string into human-readable format
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format time string
 * @param {string|Date} date
 * @returns {string}
 */
export const formatTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Get user initials from name
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

/**
 * Truncate text with ellipsis
 * @param {string} text
 * @param {number} length
 * @returns {string}
 */
export const truncateText = (text, length = 100) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Classnames utility helper
 * @param  {...any} classes
 * @returns {string}
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

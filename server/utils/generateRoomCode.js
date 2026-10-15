/**
 * Generate a random unique room code matching format: PRE-XXXXX (e.g. CSE-7K29X)
 * @param {string} prefix
 * @returns {string}
 */
export const generateRoomCode = (prefix = 'ROOM') => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 5; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const cleanPrefix = (prefix || 'ROOM').toUpperCase().slice(0, 4);
  return `${cleanPrefix}-${randomPart}`;
};

export default generateRoomCode;

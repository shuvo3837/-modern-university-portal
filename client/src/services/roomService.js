/**
 * Room Management Service
 * Handles room creation, retrieval, joining, and listing.
 */

import api from './api';

export const roomService = {
  /**
   * Get all rooms for current user
   */
  async getMyRooms() {
    return api.get('/rooms/my-rooms');
  },

  /**
   * Get public or discoverable rooms
   * @param {Object} params
   */
  async getRooms(params = {}) {
    return api.get('/rooms', { params });
  },

  /**
   * Get single room details by ID
   * @param {string} roomId
   */
  async getRoomById(roomId) {
    return api.get(`/rooms/${roomId}`);
  },

  /**
   * Create a new room
   * @param {Object} roomData
   */
  async createRoom(roomData) {
    return api.post('/rooms', roomData);
  },

  /**
   * Join a room via code or ID
   * @param {{ roomCode?: string, roomId?: string }} data
   */
  async joinRoom(data) {
    return api.post('/rooms/join', data);
  },

  /**
   * Fetch members of a room
   * @param {string} roomId
   */
  async getRoomMembers(roomId) {
    return api.get(`/rooms/${roomId}/members`);
  },
};

export default roomService;

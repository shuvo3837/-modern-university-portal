/**
 * Room Management Service
 * Handles room creation, retrieval, joining, requests, posts, and members.
 */

import api from './api';

export const roomService = {
  /**
   * Get all rooms for current user
   */
  async getMyRooms() {
    return api.get('/rooms', { params: { myRooms: true } });
  },

  /**
   * Get public or discoverable rooms
   * @param {Object} params
   */
  async getRooms(params = {}) {
    return api.get('/rooms', { params });
  },

  /**
   * Get single room details by ID or code
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
   * Join a room via code
   * @param {{ code?: string, roomCode?: string }} data
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

  /**
   * Get pending join requests
   * @param {string} roomId
   */
  async getRoomRequests(roomId) {
    return api.get(`/rooms/${roomId}/requests`);
  },

  /**
   * Approve or reject a join request
   * @param {string} roomId
   * @param {string} requestId
   * @param {'approve'|'reject'} action
   */
  async handleRoomRequest(roomId, requestId, action) {
    return api.put(`/rooms/${roomId}/requests/${requestId}`, { action });
  },

  /**
   * Fetch posts for a room
   * @param {string} roomId
   */
  async getRoomPosts(roomId) {
    return api.get(`/rooms/${roomId}/posts`);
  },

  /**
   * Create a post inside a room
   * @param {string} roomId
   * @param {{ content: string, attachments?: string[] }} postData
   */
  async createRoomPost(roomId, postData) {
    return api.post(`/rooms/${roomId}/posts`, postData);
  },
};

export default roomService;

import Post from '../models/Post.js';
import Room from '../models/Room.js';
import RoomMember from '../models/RoomMember.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * Check if user is a member of the room
 */
const verifyRoomMembership = async (roomId, userId) => {
  const member = await RoomMember.findOne({ room: roomId, user: userId });
  return !!member;
};

/**
 * POST /api/rooms/:roomId/posts
 * Create a new post in a room (room members only)
 */
export const createPost = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { content, attachments } = req.body;

    if (!content || !content.trim()) {
      return errorResponse(res, 'Post content is required.', 400);
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return errorResponse(res, 'Room not found.', 404);
    }

    const isMember = await verifyRoomMembership(roomId, req.user.id);
    if (!isMember && req.user.role !== 'university_admin') {
      return errorResponse(res, 'Access denied. You must be an enrolled room member to publish posts.', 403);
    }

    const post = await Post.create({
      room: roomId,
      author: req.user.id,
      content: content.trim(),
      attachments: Array.isArray(attachments) ? attachments : [],
    });

    const populated = await Post.findById(post._id).populate('author', 'username email role');

    return res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rooms/:roomId/posts
 * Retrieve posts for a room (room members only)
 */
export const getRoomPosts = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) {
      return errorResponse(res, 'Room not found.', 404);
    }

    // Public rooms can be viewed by authenticated users; private/approval require membership
    if (room.accessType !== 'public') {
      const isMember = await verifyRoomMembership(roomId, req.user.id);
      if (!isMember && req.user.role !== 'university_admin') {
        return errorResponse(res, 'Access denied. Only room members can view this room feed.', 403);
      }
    }

    const posts = await Post.find({ room: roomId })
      .populate('author', 'username email role')
      .sort({ createdAt: -1 });

    return successResponse(res, posts, 'Room posts retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/posts/:postId
 * Edit post (Author only)
 */
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return errorResponse(res, 'Post not found.', 404);
    }

    if (post.author.toString() !== req.user.id && req.user.role !== 'university_admin') {
      return errorResponse(res, 'Unauthorized to edit this post.', 403);
    }

    if (req.body.content) post.content = req.body.content.trim();
    if (req.body.attachments) post.attachments = req.body.attachments;

    await post.save();
    return successResponse(res, post, 'Post updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/posts/:postId
 * Delete post (Author or Admin only)
 */
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return errorResponse(res, 'Post not found.', 404);
    }

    if (post.author.toString() !== req.user.id && req.user.role !== 'university_admin') {
      return errorResponse(res, 'Unauthorized to delete this post.', 403);
    }

    await Post.deleteOne({ _id: post._id });
    return successResponse(res, { deleted: true }, 'Post deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/posts/:postId/comments
 * Add comment to a post
 */
export const addComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return errorResponse(res, 'Comment text is required.', 400);
    }

    const post = await Post.findById(postId);
    if (!post) {
      return errorResponse(res, 'Post not found.', 404);
    }

    post.comments.push({
      author: req.user.id,
      content: content.trim(),
      createdAt: new Date(),
    });

    await post.save();

    const populated = await Post.findById(postId)
      .populate('author', 'username email role')
      .populate('comments.author', 'username email role');

    return successResponse(res, populated, 'Comment posted successfully');
  } catch (error) {
    next(error);
  }
};

export default {
  createPost,
  getRoomPosts,
  updatePost,
  deletePost,
  addComment,
};

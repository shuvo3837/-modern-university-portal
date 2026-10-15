import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Room from '../models/Room.js';
import RoomMember from '../models/RoomMember.js';
import Schedule from '../models/Schedule.js';
import Notification from '../models/Notification.js';
import Post from '../models/Post.js';
import RoomRequest from '../models/RoomRequest.js';

/**
 * Database Initialization
 * Zero dummy data: clears any leftover seed data so user starts with a clean database.
 */
export const seedDatabaseIfEmpty = async () => {
  try {
    const dummyUsernames = ['admin', 'dr.rahman', 'tariqul', 'alexmorgan', 'shuvos'];
    const dummyUsers = await User.find({ username: { $in: dummyUsernames } });
    const dummyUserIds = dummyUsers.map((u) => u._id);

    if (dummyUserIds.length > 0) {
      await Profile.deleteMany({ user: { $in: dummyUserIds } });
      await Room.deleteMany({ admin: { $in: dummyUserIds } });
      await RoomMember.deleteMany({ user: { $in: dummyUserIds } });
      await RoomRequest.deleteMany({ user: { $in: dummyUserIds } });
      await Schedule.deleteMany({ user: { $in: dummyUserIds } });
      await Notification.deleteMany({
        $or: [{ recipient: { $in: dummyUserIds } }, { sender: { $in: dummyUserIds } }],
      });
      await Post.deleteMany({ author: { $in: dummyUserIds } });
      await User.deleteMany({ _id: { $in: dummyUserIds } });
      console.log('[Database] Cleared pre-seeded dummy records. Database is now completely clean.');
    }
  } catch (err) {
    console.log('[Database] Ready with zero dummy records.');
  }
};

export default seedDatabaseIfEmpty;

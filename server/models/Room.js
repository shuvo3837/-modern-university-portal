import mongoose from 'mongoose';
import { generateRoomCode } from '../utils/generateRoomCode.js';

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Room name is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      enum: ['university', 'department', 'course', 'personal', 'custom'],
      default: 'course',
      required: true,
      lowercase: true,
    },
    accessType: {
      type: String,
      enum: ['public', 'approval', 'private'],
      default: 'public',
      required: true,
      lowercase: true,
    },
    code: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    university: {
      type: String,
      default: 'Metropolitan University',
    },
    department: {
      type: String,
      default: 'Department of CSE',
    },
    parentRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Pre-validate to auto-generate code if not specified
roomSchema.pre('validate', function () {
  if (!this.code) {
    const prefix = this.name ? this.name.split(' ')[0].replace(/[^a-zA-Z]/g, '') : 'ROOM';
    this.code = generateRoomCode(prefix);
  }
});

export const Room = mongoose.model('Room', roomSchema);
export default Room;

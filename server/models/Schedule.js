import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Schedule title is required'],
      trim: true,
    },
    activityType: {
      type: String,
      enum: ['class', 'lecture', 'lab', 'seminar', 'meeting', 'consultation', 'office_hours', 'research', 'exam', 'available', 'private', 'other'],
      default: 'class',
      lowercase: true,
      required: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
    },
    repeat: {
      type: String,
      enum: ['none', 'daily', 'weekly', 'biweekly'],
      default: 'none',
      lowercase: true,
    },
    visibility: {
      type: String,
      enum: ['public', 'university', 'department', 'teachers', 'students', 'selected', 'private'],
      default: 'department',
      lowercase: true,
      required: true,
    },
    location: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    reminderMinutes: {
      type: Number,
      default: 15,
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

export const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;

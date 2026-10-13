import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Schedule title is required'],
      trim: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
    type: {
      type: String,
      enum: ['Lecture', 'Lab', 'Seminar', 'Office Hours', 'Exam', 'Meeting'],
      default: 'Lecture',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

export const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;

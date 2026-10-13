import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: '',
      maxlength: 500,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    // Academic details
    title: {
      type: String,
      default: '',
    },
    office: {
      type: String,
      default: '',
    },
    officeHours: {
      type: String,
      default: '',
    },
    enrollmentId: {
      type: String,
      default: '',
    },
    coursesTaught: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model('Profile', profileSchema);
export default Profile;

import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      default: '',
      trim: true,
    },
    profileImage: {
      type: String,
      default: '',
    },
    contact: {
      type: String,
      default: '',
    },
    university: {
      type: String,
      default: 'Metropolitan University',
    },
    department: {
      type: String,
      default: 'Department of CSE',
    },
    designation: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
      maxlength: 1000,
    },
    researchInterests: [
      {
        type: String,
      },
    ],
    courses: [
      {
        type: String,
      },
    ],
    officeLocation: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    profileVisibility: {
      type: String,
      enum: ['public', 'university', 'department', 'private'],
      default: 'public',
    },
    contactVisibility: {
      type: String,
      enum: ['public', 'university', 'department', 'private'],
      default: 'university',
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

export const Profile = mongoose.model('Profile', profileSchema);
export default Profile;

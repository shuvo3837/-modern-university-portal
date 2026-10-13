import mongoose from 'mongoose';
import config from './env.js';

export const connectDB = async () => {
  if (!config.mongoUri) {
    console.warn('[Database] Warning: MONGO_URI is not defined in environment variables. Running in mock/disconnected mode.');
    return;
  }

  try {
    const conn = await mongoose.connect(config.mongoUri);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database] Error connecting to MongoDB: ${error.message}`);
    // In production we would exit, in initial setup we log warning so server boots cleanly
    if (config.nodeEnv === 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;

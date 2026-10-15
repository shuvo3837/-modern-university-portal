import mongoose from 'mongoose';
import config from './env.js';

let mongodInstance = null;

export const connectDB = async () => {
  let uri = config.mongoUri;

  if (uri && uri.trim()) {
    try {
      console.log(`[Database] Attempting connection to configured MONGO_URI...`);
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.error(`[Database] Error connecting to configured MONGO_URI: ${error.message}`);
      console.log(`[Database] Falling back to high-performance local MongoDB instance...`);
    }
  }

  // Fallback to MongoMemoryServer for standalone zero-dependency execution
  try {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    mongodInstance = await MongoMemoryServer.create();
    uri = mongodInstance.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`[Database] MongoDB Connected (Local Instance): ${conn.connection.host} at ${uri}`);
    return conn;
  } catch (err) {
    console.error(`[Database] Fatal: Failed to initialize database connection: ${err.message}`);
    throw new Error(`MongoDB connection failed: ${err.message}`);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongodInstance) {
    await mongodInstance.stop();
  }
};

export default connectDB;

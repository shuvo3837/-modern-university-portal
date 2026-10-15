import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.BACKEND_PORT || (process.env.PORT === '8080' ? 5000 : (process.env.PORT || 5000)),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'university_workspace_jwt_secret_dev_key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};

export default config;

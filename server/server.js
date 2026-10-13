import app from './app.js';
import config from './config/env.js';
import connectDB from './config/db.js';

const startServer = async () => {
  // Connect to Database
  await connectDB();

  // Start Express HTTP Server
  const server = app.listen(config.port, () => {
    console.log(`[Server] University Workspace backend running on port ${config.port}`);
    console.log(`[Server] Environment: ${config.nodeEnv}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`[Server Error] ${err.message}`);
  });

  return server;
};

startServer();

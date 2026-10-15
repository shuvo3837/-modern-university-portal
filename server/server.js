import app from './app.js';
import config from './config/env.js';
import connectDB from './config/db.js';
import seedDatabaseIfEmpty from './config/seed.js';

const startServer = async () => {
  try {
    // 1. Connect MongoDB
    await connectDB();

    // 2. Seed initial academic data if database is empty
    await seedDatabaseIfEmpty();

    // 3. Start Express HTTP Server
    const server = app.listen(config.port, () => {
      console.log(`[Server] University Workspace backend running on port ${config.port}`);
      console.log(`[Server] Environment: ${config.nodeEnv}`);
      console.log(`[Server] Health check available at: http://localhost:${config.port}/api/health`);
    });

    // Handle unexpected rejections
    process.on('unhandledRejection', (err) => {
      console.error(`[Server Unhandled Rejection] ${err.message}`);
    });

    return server;
  } catch (err) {
    console.error(`[Server] Fatal failure starting server: ${err.message}`);
    process.exit(1);
  }
};

startServer();

import path from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import app from './server/app.js';
import connectDB from './server/config/db.js';
import seedDatabaseIfEmpty from './server/config/seed.js';

const PORT = 3000;

async function startServer() {
  try {
    // 1. Connect MongoDB
    await connectDB();

    // 2. Seed initial academic data if database is empty
    await seedDatabaseIfEmpty();

    // 3. Mount Vite dev middleware or serve static production build
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static('dist'));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve('dist', 'index.html'));
      });
    } else {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    }

    // 4. Start HTTP Server on required port 3000
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[Full-Stack Server] University Workspace running on http://0.0.0.0:${PORT}`);
      console.log(`[Full-Stack Server] API Health: http://0.0.0.0:${PORT}/api/health`);
    });
  } catch (err: any) {
    console.error(`[Full-Stack Server] Fatal initialization error: ${err.message}`);
    process.exit(1);
  }
}

startServer();

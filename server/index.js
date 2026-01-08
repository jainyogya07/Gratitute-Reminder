import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import geminiRouter from './api/gemini.js';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple request logger for debugging (kept lightweight)
app.use((req, res, next) => {
  console.log('->', req.method, req.path);
  next();
});

// Simple health check
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Mount Gemini proxy route
app.use('/api/gemini', geminiRouter);

// Fallback for unknown API routes
app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found' }));

// In production, serve the built Vite app from the `dist` folder.
if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(process.cwd(), 'dist');
  console.log('Production mode: serving static from', distPath, 'NODE_ENV=', process.env.NODE_ENV);
  app.use(express.static(distPath));
  // For any GET request that isn't an API route, serve index.html so the
  // client-side router can handle the route. Use a generic middleware instead
  // of `app.get('*', ...)` to avoid path-to-regexp incompatibilities in some
  // Express/path-to-regexp versions.
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
  // Explicitly handle index requests as a fallback if express.static doesn't
  // match for any reason. Keep this minimal to avoid tricky path-to-regexp
  // patterns which can throw in some environments.
  app.get('/', (_req, res) => res.sendFile(path.resolve(distPath, 'index.html')));
  app.get('/index.html', (_req, res) => res.sendFile(path.resolve(distPath, 'index.html')));
}

// Default to 3001 for compatibility with previous workflow and dev proxies.
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Debug helper: print registered routes when running locally (not in tests)
if (process.env.DEBUG_ROUTES === 'true') {
  if (app._router && app._router.stack) {
    const routes = [];
    app._router.stack.forEach((r) => {
      if (r.route && r.route.path) {
        const methods = Object.keys(r.route.methods).join(',');
        routes.push(`${methods.toUpperCase()} ${r.route.path}`);
      } else if (r.name === 'router' && r.handle && r.handle.stack) {
        r.handle.stack.forEach((layer) => {
          if (layer.route && layer.route.path) {
            const methods = Object.keys(layer.route.methods).join(',');
            routes.push(`${methods.toUpperCase()} ${layer.route.path}`);
          }
        });
      }
    });
    console.log('Registered routes:\n', routes.join('\n'));
  } else {
    console.log('No router stack available to inspect (express internals differ in this runtime)');
  }
}

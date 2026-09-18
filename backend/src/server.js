import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import apiRoutes from './routes/api.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middlewares
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173', '*'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome & status
app.get('/', (req, res) => {
  if (req.accepts('html')) {
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>INGO Schools ERP API</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
          .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 32px; max-width: 540px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); text-align: center; }
          h1 { color: #38bdf8; margin-top: 0; font-size: 24px; }
          p { color: #94a3b8; line-height: 1.6; }
          .badge { display: inline-block; background: #065f46; color: #34d399; padding: 4px 12px; border-radius: 9999px; font-weight: 600; font-size: 13px; margin-bottom: 16px; }
          .btn { display: inline-block; background: #0284c7; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 12px 6px; transition: background 0.2s; }
          .btn:hover { background: #0369a1; }
          .endpoints { text-align: left; background: #0f172a; border-radius: 8px; padding: 16px; margin-top: 20px; font-family: monospace; font-size: 13px; color: #cbd5e1; }
        </style>
      </head>
      <body>
        <div class="card">
          <span class="badge">● REST API Active</span>
          <h1>INGO Schools ERP Backend</h1>
          <p>You have connected to the Express REST API backend server.</p>
          <a class="btn" href="http://localhost:5173" target="_self">👉 Open Frontend Web App (localhost:5173)</a>
          <div class="endpoints">
            <strong>Available Endpoints:</strong><br/>
            • <a href="/api/health" style="color: #38bdf8;">/api/health</a> - System Health Status<br/>
            • <a href="/api/features" style="color: #38bdf8;">/api/features</a> - ERP Core Features<br/>
            • <a href="/api/stats" style="color: #38bdf8;">/api/stats</a> - Platform Statistics<br/>
            • <a href="/api/inquiries" style="color: #38bdf8;">/api/inquiries</a> - Inquiries POST API
          </div>
        </div>
      </body>
      </html>
    `);
  }

  res.json({
    name: 'INGO Schools ERP REST API',
    status: 'running',
    version: '1.0.0',
    frontendUrl: CLIENT_URL,
    endpoints: {
      health: '/api/health',
      features: '/api/features',
      stats: '/api/stats',
      inquiries: '/api/inquiries',
      authRegister: '/api/auth/register',
      authLogin: '/api/auth/login'
    }
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'INGO-SCHOOLS-ERP-API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`[INGO-SCHOOLS-ERP] Backend server is running on port ${PORT}`);
});

export default app;

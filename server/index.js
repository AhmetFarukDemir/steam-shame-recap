const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { getShame } = require('./controllers/shameController');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running! 🚀' });
});

// 🔥 SHAME ENDPOINT - Main endpoint
app.get('/api/shame/:steamId', getShame);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// Start server
app.listen(PORT, () => {
  
  if (!process.env.STEAM_API_KEY) {
    console.warn('⚠️  WARNING: STEAM_API_KEY not set! Check your .env file.');
  }
});

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes = require('./routes/taskRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

// Serve static frontend files (only if they exist - for production)
const frontendDistPath = path.join(__dirname, '../../frontend/dist');
try {
  app.use(express.static(frontendDistPath));
} catch (err) {
  console.log('Frontend dist folder not found - running in API-only mode');
}

app.get('/api', (req, res) => {
  res.json({ 
    message: 'Employee Task Tracker API is running!',
    version: '1.0.0'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/health', healthRoutes);

// Serve frontend for all other routes (SPA fallback) - only if frontend exists
app.get('*', (req, res) => {
  const indexPath = path.join(frontendDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: 'Route not found and frontend not available'
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
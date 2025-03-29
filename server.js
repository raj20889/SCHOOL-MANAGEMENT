const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // Added mysql2 import
require('dotenv').config(); // Load environment variables

const schoolRoutes = require('./routes/schoolRoutes'); // Import school routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Test database connection
app.get('/test-db', (req, res) => {
  db.connect((err) => {
      if (err) {
          res.status(500).send('Database connection failed: ' + err.message);
      } else {
          res.send('Database connected successfully!');
      }
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the School Management API!');
});

// Routes
app.use('/api/schools', schoolRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
 // Added mysql2 import
require('dotenv').config(); // Load environment variables

const schoolRoutes = require('./routes/schoolRoutes'); // Import school routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

// Create a connection to the database




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

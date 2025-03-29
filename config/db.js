const mysql = require('mysql2');
require('dotenv').config(); // Load .env variables

// Create a connection to MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL database');
});

module.exports = db;

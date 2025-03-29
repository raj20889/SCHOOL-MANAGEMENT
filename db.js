const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Allow up to 10 connections
  queueLimit: 0,
  authPlugins: {
    mysql_clear_password: () => () => process.env.DB_PASS, 
  },
});

// Test MySQL Connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
    return;
  }
  console.log("✅ MySQL Connected...");
  connection.release(); // Release the connection back to the pool
});

// Export the pool for use in other files
module.exports = pool;

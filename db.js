const mysql = require("mysql2"); // Use mysql2 instead of mysql
const dotenv = require("dotenv");

dotenv.config();

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  authPlugins: {
    mysql_clear_password: () => () => process.env.DB_PASS, // Use clear text password authentication
  },
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
    return;
  }
  console.log("✅ MySQL Connected...");
});

module.exports = db;

const mysql = require('mysql2');
require('dotenv').config(); // Load .env variables

// Create a connection to MySQL

const dbcon ='mysql://root:aYgxoLnRrOaMFdibzqRemCkyJkeHXPrY@mysql.railway.internal:3306/railway'
const db = mysql.createConnection(dbcon);

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL database');
});

module.exports = db;

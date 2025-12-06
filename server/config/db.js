// server/config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Debugging: Print values to see if they are loaded (Check terminal output)
console.log("🔍 Checking Variables:");
console.log("User:", process.env.DB_USER);
console.log("Password:", process.env.DB_PASSWORD);

// Ikkada manam Direct ga values istunnam (Temporary Fix)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',              // Direct ga 'root' ani icham
    password: 'root1234',      // Direct ga 'root1234' ani icham
    database: 'construction_erp',
});

module.exports = pool.promise();
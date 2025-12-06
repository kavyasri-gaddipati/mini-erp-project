const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 4000, // TiDB uses port 4000
    ssl: { rejectUnauthorized: true } // Required for Cloud
});
module.exports = pool.promise();
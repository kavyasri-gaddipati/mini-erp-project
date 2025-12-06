const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use('/api/auth', require('./routes/authRoutes')); // Login/Register
app.use('/api/data', require('./routes/apiRoutes'));  // Projects/Finance/AI

// Database Check
db.getConnection()
    .then(() => console.log("✅ Database Connected Successfully"))
    .catch((err) => console.error("❌ Database Connection Failed:", err));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
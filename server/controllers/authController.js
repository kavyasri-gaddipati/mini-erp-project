// server/controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER USER
exports.register = async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    const [existing] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    if (existing.length > 0) return res.status(400).json({ message: "User already exists" });

    // Encrypt Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    await db.query("INSERT INTO users (username, password_hash) VALUES (?, ?)", [username, hashedPassword]);

    res.status(201).json({ message: "User registered successfully" });
};

// 2. LOGIN USER
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Find User
    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    if (users.length === 0) return res.status(400).json({ message: "Invalid Credentials" });

    const user = users[0];

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    // Generate Token (Secret key hardcoded for now)
    const token = jwt.sign({ id: user.id, role: user.role }, "supersecretkey123", { expiresIn: "1h" });

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
};
// server/controllers/financeController.js
const db = require('../config/db');

// 1. Get All Projects (For Dashboard)
exports.getProjects = async (req, res) => {
    try {
        const [projects] = await db.query("SELECT * FROM projects");
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Create a New Project
exports.createProject = async (req, res) => {
    const { name, budget, start_date, end_date } = req.body;
    try {
        await db.query(
            "INSERT INTO projects (name, budget, start_date, end_date) VALUES (?, ?, ?, ?)",
            [name, budget, start_date, end_date]
        );
        res.status(201).json({ message: "Project Created Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Create Invoice (And update Project Spent amount)
exports.createInvoice = async (req, res) => {
    const { project_id, amount } = req.body;
    try {
        // A. Create Invoice
        await db.query("INSERT INTO invoices (project_id, amount) VALUES (?, ?)", [project_id, amount]);

        // B. Update Project 'Spent' amount (Automatic Calculation)
        await db.query("UPDATE projects SET spent = spent + ? WHERE id = ?", [amount, project_id]);

        res.status(201).json({ message: "Invoice Created & Project Budget Updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
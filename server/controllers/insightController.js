// server/controllers/insightController.js
const db = require('../config/db');

exports.getProjectRisk = async (req, res) => {
    try {
        // Fetch all projects
        const [projects] = await db.query("SELECT * FROM projects");

        const riskAnalysis = projects.map(project => {
            let riskLevel = "Low";
            let riskScore = 0;

            // Logic: If spent is more than 80% of budget -> HIGH RISK
            const percentageUsed = (project.spent / project.budget) * 100;

            if (percentageUsed > 80) {
                riskLevel = "High";
                riskScore = 80;
            } else if (percentageUsed > 50) {
                riskLevel = "Medium";
                riskScore = 50;
            }

            return {
                projectName: project.name,
                budget: project.budget,
                spent: project.spent,
                riskLevel, // 'High', 'Medium', 'Low'
                riskScore
            };
        });

        res.json(riskAnalysis);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// server/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const { getProjects, createProject, createInvoice } = require('../controllers/financeController');
const { getProjectRisk } = require('../controllers/insightController');

// Project Routes
router.get('/projects', getProjects);
router.post('/projects', createProject);

// Invoice Routes
router.post('/invoices', createInvoice);

// AI Insight Route
router.get('/insights', getProjectRisk);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  startInterview,
  submitInterview,
  getInterviewHistory,
  getDashboardStats,
} = require("../controllers/interviewController");

// ==========================
// Start Interview
// POST /api/interview/start
// ==========================
router.post("/start", startInterview);

// ==========================
// Submit Interview
// POST /api/interview/submit
// ==========================
router.post("/submit", submitInterview);

// ==========================
// Interview History
// GET /api/interview/history/:userId
// ==========================
router.get("/history/:userId", getInterviewHistory);

// ==========================
// Dashboard Statistics
// GET /api/interview/dashboard/:userId
// ==========================
router.get("/dashboard/:userId", getDashboardStats);

module.exports = router;
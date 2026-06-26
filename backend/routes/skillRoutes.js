const express = require("express");

const router = express.Router();

const {
  getSkillGap
} = require("../controllers/skillController");

// GET Skill Gap
router.get("/:userId", getSkillGap);

module.exports = router;
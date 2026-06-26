const pool = require("../config/db");
const skillData = require("../utils/skillData");

// ===============================
// Get Skill Gap Analysis
// ===============================
const getSkillGap = async (req, res) => {
  try {
    const { userId } = req.params;

    const resumeResult = await pool.query(
      `SELECT ats_score
       FROM resumes
       WHERE user_id=$1
       ORDER BY uploaded_at DESC
       LIMIT 1`,
      [userId]
    );

    const interviewResult = await pool.query(
      `SELECT AVG(score) AS avg_score
       FROM interviews
       WHERE user_id=$1`,
      [userId]
    );

    const ats = resumeResult.rows.length > 0
      ? resumeResult.rows[0].ats_score
      : 0;

    const interviewAvg = interviewResult.rows[0].avg_score || 0;

    let missingSkills = [];
    let recommendations = [];

    if (ats < 60) {
      missingSkills.push("Resume Formatting");
      recommendations.push("Improve Resume Structure");
    }

    if (interviewAvg < 3) {
      missingSkills.push("Problem Solving");
      missingSkills.push("Communication");
      recommendations.push("Practice Mock Interviews");
    }

    // 👇 Replace the old default skills here
    const role = req.query.role || "MERN";

    const expectedSkills = skillData[role] || skillData["MERN"];

    expectedSkills.forEach((skill) => {
      if (!missingSkills.includes(skill)) {
        missingSkills.push(skill);
      }
    });

    recommendations = expectedSkills.map(
      (skill) => `${skill} Course`
    );

    res.json({
      atsScore: ats,
      interviewAverage: Number(interviewAvg).toFixed(1),
      missingSkills,
      recommendations
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  getSkillGap
};
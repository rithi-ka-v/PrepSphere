const fs = require("fs");
const pdfParse = require("pdf-parse");
const pool = require("../config/db");

const analyzeResume = async (req, res) => {
  try {
    const { resumeId } = req.body;

    // Get resume from database
    const result = await pool.query(
      "SELECT * FROM resumes WHERE id = $1",
      [resumeId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const resume = result.rows[0];

    // Read PDF file
    const filePath = `uploads/${resume.resume_url}`;

    const dataBuffer = fs.readFileSync(filePath);

    // Extract text from PDF
    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text.toLowerCase();

    // Skills list
   // Skills list
const skills = [
  "react",
  "node",
  "express",
  "mongodb",
  "postgresql",
  "javascript",
  "java",
  "python",
  "git",
  "github",
  "docker",
  "aws",
  "redis",
  "jwt",
  "rest api",
  "typescript",
  "redux",
  "spring boot",
  "hibernate",
  "mysql"
];

let score = 0;
let foundSkills = [];

skills.forEach((skill) => {
  if (text.includes(skill.toLowerCase())) {
    score += 5;
    foundSkills.push(skill);
  }
});

// Prevent score from exceeding 100
score = Math.min(score, 100);

    let feedback = "";

    if (score >= 80) {
      feedback = "Excellent Resume";
    } else if (score >= 60) {
      feedback = "Good Resume";
    } else {
      feedback = "Needs Improvement";
    }

   await pool.query(
  `UPDATE resumes
   SET ats_score=$1,
       feedback=$2,
       extracted_skills=$3
   WHERE id=$4`,
  [
    score,
    feedback,
    JSON.stringify(foundSkills),
    resumeId
  ]
);

    res.json({
      atsScore: score,
      feedback,
      foundSkills,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  analyzeResume,
};
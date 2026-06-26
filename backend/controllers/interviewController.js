const pool = require("../config/db");
const questions = require("../data/questions");

// ==========================
// START INTERVIEW
// ==========================
const startInterview = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({
        message: "User ID and Role are required.",
      });
    }

    const interview = await pool.query(
      `INSERT INTO interviews (user_id, role)
       VALUES ($1, $2)
       RETURNING *`,
      [userId, role]
    );

    const interviewId = interview.rows[0].id;

    const roleQuestions = questions[role];

    if (!roleQuestions) {
      return res.status(404).json({
        message: "No questions found for this role.",
      });
    }

    res.status(200).json({
      success: true,
      interviewId,
      questions: roleQuestions,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to start interview.",
    });
  }
};

// ==========================
// SUBMIT INTERVIEW
// ==========================
const submitInterview = async (req, res) => {
  try {

    const {
      interviewId,
      role,
      answers
    } = req.body;

    const roleQuestions = questions[role];

    if (!roleQuestions) {
      return res.status(404).json({
        message: "Questions not found.",
      });
    }

    let score = 0;

    const results = [];

    for (let i = 0; i < roleQuestions.length; i++) {

      const correctAnswer =
        roleQuestions[i].answer.toLowerCase();

      const userAnswer =
        answers[i] ? answers[i].toLowerCase() : "";

      let mark = 0;

      // Simple keyword matching
      const keywords = correctAnswer.split(" ");

      let matched = 0;

      keywords.forEach((word) => {
        if (userAnswer.includes(word)) {
          matched++;
        }
      });

      if (matched >= Math.ceil(keywords.length * 0.4)) {
        mark = 1;
        score++;
      }

      await pool.query(
        `INSERT INTO interview_questions
        (
          interview_id,
          question,
          user_answer,
          correct_answer,
          marks
        )
        VALUES($1,$2,$3,$4,$5)`,
        [
          interviewId,
          roleQuestions[i].question,
          answers[i],
          roleQuestions[i].answer,
          mark,
        ]
      );

      results.push({
        question: roleQuestions[i].question,
        userAnswer: answers[i],
        correctAnswer: roleQuestions[i].answer,
        marks: mark,
        feedback:
          mark === 1
            ? "Excellent Answer"
            : "Needs Improvement",
      });
    }

    await pool.query(
      `UPDATE interviews
       SET score=$1
       WHERE id=$2`,
      [score, interviewId]
    );

    res.status(200).json({
      success: true,
      score,
      total: roleQuestions.length,
      percentage: Math.round(
        (score / roleQuestions.length) * 100
      ),
      results,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Interview submission failed.",
    });

  }
};

// ==========================
// INTERVIEW HISTORY
// ==========================
const getInterviewHistory = async (req, res) => {

  try {

    const { userId } = req.params;

    const history = await pool.query(
      `SELECT *
       FROM interviews
       WHERE user_id=$1
       ORDER BY created_at DESC`,
      [userId]
    );

    res.status(200).json(history.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Unable to fetch interview history.",
    });

  }

};

// ==========================
// DASHBOARD ANALYTICS
// ==========================
const getDashboardStats = async (req, res) => {

  try {

    const { userId } = req.params;

    const totalInterviews = await pool.query(
      `SELECT COUNT(*) FROM interviews
       WHERE user_id=$1`,
      [userId]
    );

    const averageScore = await pool.query(
      `SELECT AVG(score) FROM interviews
       WHERE user_id=$1`,
      [userId]
    );

    const latestATS = await pool.query(
      `SELECT ats_score
       FROM resumes
       WHERE user_id=$1
       ORDER BY uploaded_at DESC
       LIMIT 1`,
      [userId]
    );

    res.status(200).json({

      interviewsTaken:
        totalInterviews.rows[0].count,

      averageScore:
        Number(averageScore.rows[0].avg || 0).toFixed(1),

      atsScore:
        latestATS.rows.length
          ? latestATS.rows[0].ats_score
          : 0,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Dashboard data not found.",
    });

  }

};

module.exports = {
  startInterview,
  submitInterview,
  getInterviewHistory,
  getDashboardStats,
};
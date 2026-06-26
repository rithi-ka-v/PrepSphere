const pool = require("../config/db");

const uploadResume = async (req, res) => {
  try {

    const { userId } = req.body;

    const filePath = req.file.filename;

    const result = await pool.query(
      `
      INSERT INTO resumes(user_id,resume_url)
      VALUES($1,$2)
      RETURNING *
      `,
      [userId, filePath]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadResume
};
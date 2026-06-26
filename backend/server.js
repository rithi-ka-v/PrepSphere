require("dotenv").config();

const express = require("express");
const cors = require("cors");


const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const atsRoutes = require("./routes/atsRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const skillRoutes = require("./routes/skillRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/skills", skillRoutes);

pool.connect()
  .then(() =>
    console.log("PostgreSQL Connected Successfully")
  )
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("PrepSphere API Running");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT}`
  );
});
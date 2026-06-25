require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

pool.connect()
  .then(() => console.log("PostgreSQL Connected Successfully"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("PrepSphere API Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
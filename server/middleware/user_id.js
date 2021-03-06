const express = require("express");
const app = express();
const db = require("../config/db");

app.use(async (req, res, next) => {
  const [result] = await db.query(
    `SELECT id FROM users WHERE token = "${req.headers.token}"`
  );

  try {
    req.user_id = result[0].id;
  } catch (error) {
    req.user_id = 0;
  }

  next();
});

module.exports = app;

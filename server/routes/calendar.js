const express = require("express");
const db = require("../data/db");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  const start = new Date(req.query.start);
  const end = new Date(req.query.end);

  const query = `SELECT * FROM plan WHERE (date BETWEEN (?) AND (?)) AND memberId = (?)`;
  const plans = await db.query(query, [start, end, decoded.id]);

  res.json(plans[0]);
});

router.post("/", async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const memberId = decoded.id;

  const data = [
    req.body.title,
    req.body.description,
    req.body.date,
    req.body.startTime,
    req.body.endTime,
    req.body.ddayChecked,
    req.body.color,
    memberId,
  ];
  const query = `INSERT INTO plan (title, description, date, startTime, endTime, ddayChecked, color, memberId) VALUES (?)`;
  await db.query(query, [data]);

  res.json();
});

router.patch("/", async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const memberId = decoded.id;
  const data = [
    req.body.title,
    req.body.description,
    req.body.date,
    req.body.startTime,
    req.body.endTime,
    req.body.ddayChecked,
    req.body.color,
    req.body.id,
    memberId,
  ];
  const query = `UPDATE plan SET title=(?), description=(?), date=(?), startTime=(?), endTime=(?), ddayChecked=(?), color=(?), memberId=(?)  WHERE planId = (?);`;

  await db.query(query, data);

  res.json({ message: "Schedule has been successfully edited." });
});

router.delete("/", async (req, res) => {
  const id = req.query.id;

  await db.query(`DELETE FROM plan WHERE planId = (?)`, id);

  res.json({ message: "Schedule has been successfully deleted." });
});

module.exports = router;

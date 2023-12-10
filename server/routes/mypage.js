const express = require("express");
const db = require("../data/db");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  const query = `SELECT email, name, birthday FROM member WHERE memberId = (?);`;
  const userInfo = await db.query(query, decoded.id);

  res.json(userInfo[0][0]);
});

router.patch("/", async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const memberId = decoded.id;
  let userInfo;

  if (req.body.name) {
    userInfo = await db.query(`UPDATE member SET name=(?) WHERE memberId = (?)`, [
      req.body.name,
      memberId,
    ]);
  } else if (req.body.password) {
    userInfo = await db.query(`UPDATE member SET password=(?) WHERE memberId = (?)`, [
      req.body.password,
      memberId,
    ]);
  } else if (req.body.birthday) {
    userInfo = await db.query(`UPDATE member SET birthday=(?) WHERE memberId = (?)`, [
      req.body.birthday,
      memberId,
    ]);
  }

  res.json(userInfo[0]);
});

router.delete("/", async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  await db.query(`DELETE FROM member WHERE memberId = (?)`, [decoded.id]);

  res.status(200).json({ message: "User info has been successfully deleted." });
});

module.exports = router;

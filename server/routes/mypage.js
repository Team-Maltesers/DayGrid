const express = require("express");
const db = require("../data/databasejy");
const router = express.Router();

router.get("/", async (req, res) => {
  const id = req.query.id;
  const query = `SELECT email, name, birthday FROM member WHERE memberId = (?);`;
  const userInfo = await db.query(query, id);

  res.json(userInfo[0][0]);
});

router.patch("/edit/id", async (req, res) => {
  const id = req.query.id;
  const query = `SELECT email, name, birthday FROM member WHERE memberId = (?);`;
  const userInfo = await db.query(query, id);

  res.json(userInfo[0]);
});

module.exports = router;

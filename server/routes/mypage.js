const express = require("express");
const db = require("../data/databasejy");
const router = express.Router();

router.get("/", async (req, res) => {
  const id = req.query.id;
  const query = `SELECT email, name, birthday FROM member WHERE memberId = (?);`;
  const userInfo = await db.query(query, id);

  res.json(userInfo[0][0]);
});

router.patch("/", async (req, res) => {
  const id = req.body.id;
  let userInfo;

  if (req.body.name) {
    userInfo = await db.query(`UPDATE member SET name=(?) WHERE memberId = (?)`, [req.body.name, id]);
  } else if (req.body.password) {
    userInfo = await db.query(`UPDATE member SET password=(?) WHERE memberId = (?)`, [req.body.password, id]);
  } else if (req.body.birthday) {
    userInfo = await db.query(`UPDATE member SET birthday=(?) WHERE memberId = (?)`, [req.body.birthday, id]);
  }

  res.json(userInfo[0]);
});

router.delete("/", async (req, res) => {
  const id = req.query.id;

  await db.query(`DELETE FROM member WHERE memberId = (?)`, id);

  res.json({ message: "Schedule has been successfully deleted." });
});

module.exports = router;

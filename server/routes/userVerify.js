const express = require("express");
const db = require("../data/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ message: "Signup data is required" });
    }
    const validation = await db.query(`SELECT email FROM member WHERE email = (?)`, data.email);
    if (validation[0].length !== 0) {
      return res.status(409).json({ messgae: "이미 존재하는 이메일 입니다." });
    } else {
      const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
      const encryptedPW = bcrypt.hashSync(data.password, salt);
      const [result] = await db.query(
        "INSERT INTO member (name, email, password, birthday) VALUES (?, ?, ?, ?)",
        [data.name, data.email, encryptedPW, data.birthDate],
      );

      if (result.affectedRows === 0) {
        res.status(500).json({ message: "Insert failed" });
      } else {
        res.status(200).json({ message: "Insert successful" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const [user] = await db.query(
      `SELECT memberId, email, password FROM member WHERE email=(?)`,
      req.body.email,
    );

    if (!user) {
      return res.status(400).json({ message: "존재하지 않는 이메일입니다." });
    }

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (match) {
      const accessToken = jwt.sign({ id: user[0].memberId }, process.env.JWT_KEY, {
        expiresIn: "1h",
      });
      const refreshToken = jwt.sign({ id: user[0].memberId }, process.env.JWT_KEY, {
        expiresIn: "7d",
      });
      await db.query(`UPDATE member SET refreshToken = (?) WHERE email=(?)`, [
        refreshToken,
        req.body.email,
      ]);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });
      return res.status(200).json({ accessToken: accessToken });
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;

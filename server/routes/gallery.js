const express = require("express");
const pool = require("../data/db");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = req.headers.authorization.split("Bearer ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const memberId = decoded.id;
    let page = parseInt(req.query.page) || 1;
    const entriesPerPage = 6;
    const offset = (page - 1) * entriesPerPage;

    const [rows] = await pool.query(
      `SELECT * FROM diary  WHERE hasImage = true AND memberId = ? ORDER BY diaryId DESC LIMIT ? OFFSET ?`,
      [memberId, entriesPerPage, offset],
    );

    const [totalRows] = await pool.query(
      `SELECT COUNT(*) as count FROM diary WHERE hasImage = true AND memberId = ?`,
      [memberId],
    );
    const totalPages = Math.ceil(totalRows[0].count / entriesPerPage);

    page = Math.max(1, Math.min(page, totalPages));

    res.json({
      total_pages: totalPages,
      current_page: page,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;

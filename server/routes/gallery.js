const express = require("express");
const pool = require("../data/db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    const entriesPerPage = 6;
    const offset = (page - 1) * entriesPerPage;

    const [rows] = await pool.query(`SELECT * FROM diary WHERE hasImage = true LIMIT ? OFFSET ?`, [
      entriesPerPage,
      offset,
    ]);

    const [totalRows] = await pool.query(
      `SELECT COUNT(*) as count FROM diary WHERE hasImage = true`,
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

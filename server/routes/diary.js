const express = require("express");
const pool = require("../data/db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sanitizeHtml = require("sanitize-html");

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
    page = Math.max(1, page);
    const entriesPerPage = 10;
    const offset = (page - 1) * entriesPerPage;

    const [totalRows] = await pool.query("SELECT COUNT(*) as count FROM diary WHERE memberId = ?", [
      memberId,
    ]);
    const totalDiaries = totalRows[0].count;
    const totalPages = Math.ceil(totalDiaries / entriesPerPage);
    page = Math.min(page, totalPages);

    const [diaries] = await pool.query(
      "SELECT * FROM diary WHERE memberId = ? ORDER BY diaryId DESC LIMIT ? OFFSET ?",
      [memberId, entriesPerPage, offset],
    );
    res.json({
      total_pages: totalPages,
      current_page: page,
      data: diaries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const memberId = decoded.id;

    const { title, content } = req.body;
    const cleanContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    });
    if (!title || !cleanContent) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const newDiary = {
      title: title,
      content: cleanContent,
      hasImage: cleanContent.includes("<img"),
      memberId: memberId,
    };
    const [result] = await pool.query(
      "INSERT INTO diary (title, content, hasImage, memberId) VALUES (?, ?, ?, ?)",
      [newDiary.title, newDiary.content, newDiary.hasImage, memberId],
    );
    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Insert failed" });
    }
    res.json({ diary: newDiary });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM diary WHERE diaryId = ?", [id]);
    const diary = rows[0];
    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }
    res.json(diary);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = req.headers.authorization.split("Bearer ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const memberId = decoded.id;
    const { id } = req.params;
    const { title, content } = req.body;
    const cleanContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    });
    if (!title || !cleanContent) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const updatedDiary = {
      title: title,
      content: cleanContent,
      hasImage: cleanContent.includes("<img"),
    };
    const [result] = await pool.query(
      "UPDATE diary SET title = ?, content = ?, hasImage = ?, memberId = ?, WHERE diaryId = ?",
      [updatedDiary.title, updatedDiary.content, updatedDiary.hasImage, memberId, id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Diary not found" });
    }
    res.json({ message: "Diary updated successfully", diary: updatedDiary });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM diary WHERE diaryId = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Diary not found" });
    }
    res.json({ message: "Diary deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;

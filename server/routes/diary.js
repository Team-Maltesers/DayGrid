const express = require("express");
const pool = require("../data/db");
const router = express.Router();
const sanitizeHtml = require("sanitize-html");

router.get("/", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    page = Math.max(1, page);
    const entriesPerPage = 10;
    const offset = (page - 1) * entriesPerPage;

    const [totalRows] = await pool.query("SELECT COUNT(*) as count FROM diary");
    const totalDiaries = totalRows[0].count;
    const totalPages = Math.ceil(totalDiaries / entriesPerPage);
    page = Math.min(page, totalPages);

    const [diaries] = await pool.query(
      "SELECT * FROM diary ORDER BY diaryId DESC LIMIT ? OFFSET ?",
      [entriesPerPage, offset],
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
    };
    const [result] = await pool.query(
      "INSERT INTO diary (title, content, hasImage) VALUES (?, ?, ?)",
      [newDiary.title, newDiary.content, newDiary.hasImage],
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
      "UPDATE diary SET title = ?, content = ?, hasImage = ? WHERE diaryId = ?",
      [updatedDiary.title, updatedDiary.content, updatedDiary.hasImage, id],
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

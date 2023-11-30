const express = require("express");
const router = express.Router();
const pool = require("../data/db");

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

module.exports = router;

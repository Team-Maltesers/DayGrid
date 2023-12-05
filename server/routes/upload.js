const express = require("express");
const app = express();
const router = express.Router();
const multer = require("multer");
const path = require("path");
const uploadFolder = path.resolve(__dirname, "../uploads");

app.use("/uploads", express.static(uploadFolder));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000);
    cb(null, `${timestamp}-${randomNumber}${extension}`);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("img"), (req, res) => {
  res.json({
    imgUrl: `${process.env.SERVER}/uploads/${req.file.filename}`,
  });
});

module.exports = router;

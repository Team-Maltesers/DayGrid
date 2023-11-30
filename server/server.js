const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const calendarRoutes = require("./routes/calendar");
const mypageRoutes = require("./routes/mypage");
const uploadRoutes = require("./routes/upload");
const diaryRoutes = require("./routes/diary");
const galleryRoutes = require("./routes/gallery");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
app.use("/uploads", express.static(path.resolve(__dirname, "./uploads")));

app.use("/diary", diaryRoutes);
app.use("/gallery", galleryRoutes);
app.use("/upload", uploadRoutes);
app.use("/calendar", calendarRoutes);
app.use("/my-page", mypageRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

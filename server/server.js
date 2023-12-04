const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const verifyRoutes = require("./routes/userVerify");
const calendarRoutes = require("./routes/calendar");
const mypageRoutes = require("./routes/mypage");
const uploadRoutes = require("./routes/upload");
const diaryRoutes = require("./routes/diary");
const galleryRoutes = require("./routes/gallery");
const refreshRoutes = require("./routes/refresh");
const auth = require("./data/auth");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
app.use("/uploads", express.static(path.resolve(__dirname, "./uploads")));

app.use("/", verifyRoutes);
app.use("/refresh", refreshRoutes);

app.use("/diary", auth, diaryRoutes);
app.use("/gallery", auth, galleryRoutes);
app.use("/upload", auth, uploadRoutes);
app.use("/calendar", auth, calendarRoutes);
app.use("/my-page", auth, mypageRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

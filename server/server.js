const fs = require("fs/promises");
const express = require("express");
const db = require("./data/databasejy");
const sanitizeHtml = require("sanitize-html");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "build")));
app.post("/signup", async (req, res) => {
  const newData = req.body;

  if (!newData) {
    return res.status(400).json({ message: "newData is required" });
  }

  const formDataFileContent = await fs.readFile("./data/signup.json");
  const formData = JSON.parse(formDataFileContent);

  const newFormData = {
    id: Math.round(Math.random() * 10000).toString(),
    ...newData,
  };

  formData.push(newFormData);

  await fs.writeFile("./data/signup.json", JSON.stringify(formData));

  res.json({ formData: newFormData });
});
app.get("/diary/:id", async (req, res) => {
  const { id } = req.params;

  // 데이터 파일에서 다이어리 정보를 읽어옵니다.
  const diaryFileContent = await fs.readFile(path.join(__dirname, "./data/diary.json"));
  const diaries = JSON.parse(diaryFileContent);

  // id가 일치하는 다이어리를 찾습니다.
  const diary = diaries.find((d) => d.id === id);

  if (!diary) {
    return res.status(404).json({ message: "Diary not found" });
  }

  res.json(diary);
});
app.delete("/diary/:id", async (req, res) => {
  const { id } = req.params;

  // 데이터 파일에서 다이어리 정보를 읽어옵니다.
  const diaryFileContent = await fs.readFile(path.join(__dirname, "./data/diary.json"));
  const diaries = JSON.parse(diaryFileContent);

  // id가 일치하는 다이어리를 찾아서 삭제합니다.
  const diaryIndex = diaries.findIndex((d) => d.id === id);
  if (diaryIndex === -1) {
    return res.status(404).json({ message: "Diary not found" });
  }
  diaries.splice(diaryIndex, 1);
  await fs.writeFile(path.join(__dirname, "./data/diary.json"), JSON.stringify(diaries));
  res.json({ message: "Diary deleted successfully" });
});

app.get("/diary", async (req, res) => {
  // 데이터 파일에서 다이어리 정보를 읽어옵니다.
  const diaryFileContent = await fs.readFile(path.join(__dirname, "./data/diary.json"));
  const diaries = JSON.parse(diaryFileContent);

  // 페이지 계산
  const entriesPerPage = 10;
  const totalPages = Math.ceil(diaries.length / entriesPerPage);

  // 기본 페이지는 1로 설정
  let page = parseInt(req.query.page) || 1;

  // 페이지 범위 체크
  page = Math.max(1, Math.min(page, totalPages));

  // 시작과 끝 인덱스 계산
  const startIndex = (page - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  // 현재 페이지에 해당하는 다이어리 가져오기
  const diariesOnPage = diaries.slice(startIndex, endIndex);

  res.json({
    total_pages: totalPages,
    current_page: page,
    data: diariesOnPage,
  });
});
// 이미지를 서버에 저장하는 경로와 파일 이름 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000); // 0-999 사이의 랜덤한 숫자 생성
    cb(null, `${timestamp}-${randomNumber}${extension}`);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("img"), (req, res) => {
  // 이미지가 서버에 저장된 후 해당 이미지의 URL을 클라이언트에게 반환
  res.json({ imgUrl: `http://localhost:3000/uploads/${req.file.filename}` });
});

app.post("/diary", async (req, res) => {
  const { title, content } = req.body;
  const cleanContent = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
  });
  if (!title || !cleanContent) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const diaryFileContent = await fs.readFile("./data/diary.json");
  const diaries = JSON.parse(diaryFileContent);

  const newDiary = {
    id: Math.round(Math.random() * 10000).toString(),
    title: title,
    content: cleanContent,
    hasImage: cleanContent.includes("<img"),
    // 필요한 경우 추가 필드를 여기에 추가할 수 있습니다.
  };

  diaries.push(newDiary);

  await fs.writeFile("./data/diary.json", JSON.stringify(diaries));

  res.json({ diary: newDiary });
});

app.get("/diary-with-images", async (req, res) => {
  // 데이터 파일에서 다이어리 정보를 읽어옵니다.
  const diaryFileContent = await fs.readFile(path.join(__dirname, "./data/diary.json"));
  const diaries = JSON.parse(diaryFileContent);

  // 'hasImage' 필드가 'true'인 다이어리만 필터링합니다.
  const diariesWithImages = diaries.filter((diary) => diary.hasImage);
  // 페이지 계산
  const entriesPerPage = 6; // 한 페이지에 6개의 게시물을 보여줍니다.
  const totalPages = Math.ceil(diariesWithImages.length / entriesPerPage);

  // 기본 페이지는 1로 설정
  let page = parseInt(req.query.page) || 1;

  // 페이지 범위 체크
  page = Math.max(1, Math.min(page, totalPages));

  // 시작과 끝 인덱스 계산
  const startIndex = (page - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  // 현재 페이지에 해당하는 다이어리 가져오기
  const diariesOnPage = diariesWithImages.slice(startIndex, endIndex);

  res.json({
    total_pages: totalPages,
    current_page: page,
    data: diariesOnPage,
  });
});

app.get("/calendar", async (req, res) => {
  const start = new Date(req.query.start);
  const end = new Date(req.query.end);
  const query = `SELECT * FROM plan WHERE date BETWEEN (?) AND (?)`;
  const plans = await db.query(query, [start, end]);

  res.json(plans[0]);
});

app.post("/calendar", async (req, res) => {
  const data = [
    req.body.title,
    req.body.description,
    req.body.date,
    req.body.startTime,
    req.body.endTime,
    req.body.ddayChecked,
    req.body.color,
  ];
  const query = `INSERT INTO plan (title, description, date, startTime, endTime, ddayChecked, color) VALUES (?)`;
  await db.query(query, [data]);

  res.json();
});

app.patch("/calendar", async (req, res) => {
  const data = [
    req.body.title,
    req.body.description,
    req.body.date,
    req.body.startTime,
    req.body.endTime,
    req.body.ddayChecked,
    req.body.color,
    req.body.id,
  ];
  const query = `UPDATE plan SET title=(?), description=(?), date=(?), startTime=(?), endTime=(?), ddayChecked=(?), color=(?)  WHERE planId = (?);`;

  await db.query(query, data);

  res.json({ message: "Schedule has been successfully edited." });
});

app.delete("/calendar", async (req, res) => {
  const id = req.query.id;

  await db.query(`DELETE FROM plan WHERE planId = (?)`, id);

  res.json({ message: "Schedule has been successfully deleted." });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

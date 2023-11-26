const fs = require('fs/promises');
const express = require('express');
const sanitizeHtml = require('sanitize-html');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'build')));

async function readDiaryFile() {
  const diaryFileContent = await fs.readFile(path.join(__dirname, './data/diary.json'));
  return JSON.parse(diaryFileContent);
}

app.post('/signup', async (req, res) => {
  try {
    const newData = req.body;
    if (!newData) {
      return res.status(400).json({ message: 'newData is required' });
    }
    
    const formDataFileContent = await fs.readFile('./data/signup.json');
    const formData = JSON.parse(formDataFileContent);
    
    const newFormData = {
      id: Math.round(Math.random() * 10000).toString(),
      ...newData,
    };
    
    formData.push(newFormData);
    
    await fs.writeFile('./data/signup.json', JSON.stringify(formData));
    
    res.json({ formData: newFormData });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

app.get('/diary/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const diaries = await readDiaryFile();
    const diary = diaries.find((d) => d.id === id);
    if (!diary) {
      return res.status(404).json({ message: 'Diary not found' });
    }
    res.json(diary);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

app.delete('/diary/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const diaries = await readDiaryFile();
    const diaryIndex = diaries.findIndex((d) => d.id === id);
    if (diaryIndex === -1) {
      return res.status(404).json({ message: 'Diary not found' });
    }
    diaries.splice(diaryIndex, 1);
    await fs.writeFile(path.join(__dirname, './data/diary.json'), JSON.stringify(diaries));
    res.json({ message: 'Diary deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});
app.get('/diary', async (req, res) => {
  try {
    const diaries = await readDiaryFile();
    const entriesPerPage = 10;
    const totalPages = Math.ceil(diaries.length / entriesPerPage);
    let page = parseInt(req.query.page) || 1;
    page = Math.max(1, Math.min(page, totalPages));
    const startIndex = (page - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const diariesOnPage = diaries.slice(startIndex, endIndex);
    res.json({
      total_pages: totalPages,
      current_page: page,
      data: diariesOnPage
    });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000);
    cb(null, `${timestamp}-${randomNumber}${extension}`);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('img'), (req, res) => {
  res.json({ imgUrl: `http://localhost:3000/uploads/${req.file.filename}` });
});

app.post('/diary', async (req, res) => {
  try {
    const { title, content } = req.body;
    const cleanContent = sanitizeHtml(content,{allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])});
    if (!title || !cleanContent) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    const diaries = await readDiaryFile();
    const newDiary = {
      id: Math.round(Math.random() * 10000).toString(),
      title: title,
      content: cleanContent,
      hasImage: cleanContent.includes('<img'),
    };
    diaries.push(newDiary);
    await fs.writeFile('./data/diary.json', JSON.stringify(diaries));
    res.json({ diary: newDiary });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

app.get('/diary-with-images', async (req, res) => {
  try {
    const diaries = await readDiaryFile();
    const diariesWithImages = diaries.filter((diary) => diary.hasImage);
    const entriesPerPage = 6;
    const totalPages = Math.ceil(diariesWithImages.length / entriesPerPage);
    let page = parseInt(req.query.page) || 1;
    page = Math.max(1, Math.min(page, totalPages));
    const startIndex = (page - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const diariesOnPage = diariesWithImages.slice(startIndex, endIndex);
    res.json({
      total_pages: totalPages,
      current_page: page,
      data: diariesOnPage
    });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
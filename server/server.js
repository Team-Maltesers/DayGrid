const fs = require('fs/promises'); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors()); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.post('/signup', async (req, res) => {
    const newData = req.body;
  
    if (!newData) {
      return res.status(400).json({ message: 'newData is required' });
    }
  
    console.log(newData);
  
    // if (
    //   !formData.title?.trim() ||
    //   !formData.description?.trim() ||
    //   !formData.date?.trim() ||
    //   !formData.time?.trim() ||
    //   !formData.image?.trim() ||
    //   !formData.location?.trim()
    // ) {
    //   return res.status(400).json({ message: 'Invalid data provided.' });
    // }
  
    const formDataFileContent = await fs.readFile('./data/signup.json');
    const formData = JSON.parse(formDataFileContent);
  
    const newFormData = {
      id: Math.round(Math.random() * 10000).toString(),
      ...newData,
    };
  
    formData.push(newFormData);
  
    await fs.writeFile('./data/signup.json', JSON.stringify(formData));
  
    res.json({ formData: newFormData });
  });
app.get('/diary/:id', async (req, res) => {
  const { id } = req.params;

  // 데이터 파일에서 다이어리 정보를 읽어옵니다.
  const diaryFileContent = await fs.readFile(path.join(__dirname, './data/diary.json'));
  const diaries = JSON.parse(diaryFileContent);

  // id가 일치하는 다이어리를 찾습니다.
  const diary = diaries.find((d) => d.id === id);
  
  if (!diary) {
      return res.status(404).json({ message: 'Diary not found' });
    }

  res.json(diary);
});
app.delete('/diary/:id', async (req, res) => {
  const { id } = req.params;

  // 데이터 파일에서 다이어리 정보를 읽어옵니다.
  const diaryFileContent = await fs.readFile(path.join(__dirname, './data/diary.json'));
  const diaries = JSON.parse(diaryFileContent);

  // id가 일치하는 다이어리를 찾아서 삭제합니다.
  const diaryIndex = diaries.findIndex((d) => d.id === id);
  if (diaryIndex === -1) {
    return res.status(404).json({ message: 'Diary not found' });
  }
  diaries.splice(diaryIndex, 1);
  await fs.writeFile(path.join(__dirname, './data/diary.json'), JSON.stringify(diaries));
  res.json({ message: 'Diary deleted successfully' });
});

app.get('/diary', async (req, res) => {
  // 데이터 파일에서 다이어리 정보를 읽어옵니다.
  const diaryFileContent = await fs.readFile(path.join(__dirname, './data/diary.json'));
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
    data: diariesOnPage
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
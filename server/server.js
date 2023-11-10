const fs = require('fs/promises'); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle file upload
app.post('/upload', upload.single('photo'), (req, res) => {
  res.json({ filename: req.file.filename });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

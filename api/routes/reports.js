// api/routes/reports.js
const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const multer = require('multer');
const path = require('path');

// Configuração do armazenamento de imagens
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/'),
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Criar um novo relato
router.post('/', upload.single('image'), async (req, res) => {
  const { description, category, latitude, longitude } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const newReport = new Report({
    description,
    category,
    latitude,
    longitude,
    imageUrl,
  });

  try {
    await newReport.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obter todos os relatos
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

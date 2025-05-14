import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import Resume from '../models/Resume.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Get resume
router.get('/', async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload/Update resume
router.post('/', auth, upload.single('resume'), async (req, res) => {
  const filePath = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    // Delete existing resume
    const existingResume = await Resume.findOne();
    if (existingResume && existingResume.filePath) {
      const oldFilePath = path.join(__dirname, '..', existingResume.filePath);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      await Resume.deleteOne({ _id: existingResume._id });
    }

    // Create new resume
    const resume = new Resume({ filePath });
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
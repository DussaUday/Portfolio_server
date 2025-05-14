import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import Certificate from '../models/Certificate.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Get all certificates
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ date: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add certificate
router.post('/', auth, upload.single('image'), async (req, res) => {
  const { title, date } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const certificate = new Certificate({ title, date, image });
    await certificate.save();
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update certificate
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  const { title, date } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const updateData = { title, date };
    if (image) updateData.image = image;

    const certificate = await Certificate.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });

    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete certificate
router.delete('/:id', auth, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });

    res.json({ message: 'Certificate deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
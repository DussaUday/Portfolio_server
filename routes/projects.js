import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import Project from '../models/Project.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add project
router.post('/', auth, upload.single('image'), async (req, res) => {
  const { title, description, projectLink, githubLink } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const project = new Project({ title, description, image, projectLink, githubLink });
    await project.save();
    req.app.get('io').emit('projectUpdate', { message: 'Projects updated' });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update project
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  const { title, description, projectLink, githubLink } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const updateData = { title, description, projectLink, githubLink };
    if (image) updateData.image = image;

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    req.app.get('io').emit('projectUpdate', { message: 'Projects updated' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    req.app.get('io').emit('projectUpdate', { message: 'Projects updated' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
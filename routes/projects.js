import express from 'express';
import auth from '../middleware/auth.js';
import Project from '../models/Project.js';

const router = express.Router();

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
router.post('/', auth, async (req, res) => {
  const { title, description, projectLink, githubLink, image } = req.body;

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
router.put('/:id', auth, async (req, res) => {
  const { title, description, projectLink, githubLink, image } = req.body;

  try {
    const updateData = { title, description, projectLink, githubLink, image };

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
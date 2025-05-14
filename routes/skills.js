import express from 'express';
import auth from '../middleware/auth.js';
import Skill from '../models/Skill.js';

const router = express.Router();

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add skill
router.post('/', auth, async (req, res) => {
  const { name, proficiency, icon } = req.body;

  try {
    const skill = new Skill({ name, proficiency, icon });
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update skill
router.put('/:id', auth, async (req, res) => {
  const { name, proficiency, icon } = req.body;

  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, proficiency, icon },
      { new: true }
    );
    if (!skill) return res.status(404).json({ message: 'Skill not found' });

    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete skill
router.delete('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });

    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Login attempt:', { username, password }); // Debug log
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', user); // Debug log
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful:', username);
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Initialize default admin user
router.get('/init', async (req, res) => {
  try {
    const user = await User.findOne({ username: 'Uday@469' });
    if (!user) {
      await User.create({ username: 'Uday@469', password: 'Uday@2004' });
      console.log('Default admin created');
      res.json({ message: 'Default admin created' });
    } else {
      console.log('Admin already exists');
      res.json({ message: 'Admin already exists' });
    }
  } catch (error) {
    console.error('Init error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
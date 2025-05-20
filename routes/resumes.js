import express from 'express';

const router = express.Router();

// Get resume link
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      resumeUrl: 'https://udaykrishna.tiiny.site',
      filename: 'Uday-resume.pdf',
      message: 'Resume is available at the provided URL'
    });
  } catch (error) {
    console.error('Error in resume route:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
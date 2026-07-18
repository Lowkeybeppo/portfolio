import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/game/submit
// @desc    Submit game result
// @access  Private
router.post('/submit', auth, (req, res) => {
  // TODO: Submit game result logic
  res.json({ message: 'Submit game result endpoint' });
});

// @route   GET /api/game/stats
// @desc    Get user game stats
// @access  Private
router.get('/stats', auth, (req, res) => {
  // TODO: Get user stats logic
  res.json({ message: 'Get user stats endpoint' });
});

// @route   GET /api/game/leaderboard
// @desc    Get global leaderboard
// @access  Public
router.get('/leaderboard', async (req, res) => {
  try {
    const scores = await GameScore.find()
      .sort({ score: -1 })
      .limit(10)
      .populate('userId', 'username');
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
  res.json({ message: 'Get leaderboard endpoint' });
});

export default router;

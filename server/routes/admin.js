import express from 'express';
import { auth, isAdmin } from '../middleware/auth.js';
import User from '../models/User.js';
import GameScore from '../models/GameScore.js';
import Word from '../models/Word.js';

const router = express.Router();

router.use(auth, isAdmin);

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/users/:id', async (req, res) => {
  try {
    const { username, isAdmin } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (typeof isAdmin === 'boolean') user.isAdmin = isAdmin;

    await user.save();

    res.json({
      message: 'User updated',
      user: {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/game-scores', async (req, res) => {
  try {
    const scores = await GameScore.find()
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/game-scores/:id', async (req, res) => {
  try {
    const score = await GameScore.findByIdAndDelete(req.params.id);
    if (!score) {
      return res.status(404).json({ message: 'Score not found' });
    }

    res.json({ message: 'Score deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalScores = await GameScore.countDocuments();

    const bestScore = await GameScore.findOne().sort({ attempts: 1, time: 1 });
    const recentScores = await GameScore.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalUsers,
      totalScores,
      bestScore: bestScore
        ? {
            attempts: bestScore.attempts,
            word: bestScore.word,
            user: bestScore.user,
          }
        : null,
      recentScores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/words', async (req, res) => {
  try {
    const words = await Word.find().sort({ value: 1 });
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/words', async (req, res) => {
  try {
    const value = req.body.value?.trim().toLowerCase();

    if (!/^[a-z]{5}$/.test(value || '')) {
      return res.status(400).json({
        message: 'Word must contain exactly 5 letters',
      });
    }

    const word = await Word.create({ value });
    res.status(201).json(word);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Word already exists' });
    }

    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/words/:id', async (req, res) => {
  try {
    const word = await Word.findByIdAndUpdate(
      req.params.id,
      { active: Boolean(req.body.active) },
      { new: true, runValidators: true }
    );

    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }

    res.json(word);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/words/:id', async (req, res) => {
  try {
    const word = await Word.findByIdAndDelete(req.params.id);

    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }

    res.json({ message: 'Word deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

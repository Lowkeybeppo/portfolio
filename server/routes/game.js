import express from 'express';
import { auth } from '../middleware/auth.js';
import GameScore from '../models/GameScore.js';
import Word from '../models/Word.js';
import DailyWord from '../models/DailyWord.js';

const router = express.Router();

router.get('/word', async (req, res) => {
  try {
    const date = new Date().toISOString().slice(0, 10);

    const existingAssignment = await DailyWord.findOne({ date }).lean();

    if (existingAssignment) {
      return res.json({
        word: existingAssignment.word,
        date,
      });
    }

    const [randomWord] = await Word.aggregate([
      { $match: { active: true } },
      { $sample: { size: 1 } },
    ]);

    if (!randomWord) {
      return res.status(500).json({
        message: 'No active words are available',
      });
    }

    try {
      const assignment = await DailyWord.create({
        date,
        word: randomWord.value,
      });

      return res.json({
        word: assignment.word,
        date: assignment.date,
      });
    } catch (error) {
      // Another request may have created today's word first.
      if (error.code === 11000) {
        const assignment = await DailyWord.findOne({ date }).lean();

        return res.json({
          word: assignment.word,
          date: assignment.date,
        });
      }

      throw error;
    }
  } catch (error) {
    console.error('Failed to get daily word:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/submit', auth, async (req, res) => {
  try {
    const { word, attempts, time } = req.body;

    if (!word || !attempts || !time) {
      return res.status(400).json({ message: 'Missing game result fields' });
    }

    const score = new GameScore({
      user: req.user.id,
      word,
      attempts,
      won: attempts <= 6,
      time,
    });

    await score.save();

    res.json({
      message: 'Game result saved',
      score: {
        id: score._id,
        attempts: score.attempts,
        word: score.word,
        time: score.time,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/stats', auth, async (req, res) => {
  try {
    const scores = await GameScore.find({ user: req.user.id });

    const bestScore = scores.length
      ? Math.min(...scores.map((score) => score.attempts))
      : null;

    const averageAttempts = scores.length
      ? Math.round(
          scores.reduce((sum, score) => sum + score.attempts, 0) / scores.length
        )
      : 0;

    const latest = scores.length
      ? scores
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
          : null;

    res.json({
      bestScore,
      averageAttempts,
      latestAttempt: latest ? latest.attempts : null,
      totalGames: scores.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/leaderboard', async (req, res) => {
  try {
    const scores = await GameScore.find()
      .populate('user', 'username')
      .sort({ attempts: 1, time: 1 })
      .limit(10);

    const leaderboard = scores.map((score) => ({
      username: score.user?.username || 'Unknown',
      score: score.attempts,
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

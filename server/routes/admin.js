import express from 'express';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// All admin routes are protected
router.use(auth, isAdmin);

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', (req, res) => {
  // TODO: Get all users logic
  res.json({ message: 'Get all users endpoint' });
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user by ID
// @access  Private/Admin
router.delete('/users/:id', (req, res) => {
  // TODO: Delete user logic
  res.json({ message: 'Delete user endpoint' });
});

// @route   GET /api/admin/stats
// @desc    Get system stats
// @access  Private/Admin
router.get('/stats', (req, res) => {
  // TODO: Get system stats logic
  res.json({ message: 'Get system stats endpoint' });
});

// @route   GET /api/admin/game-scores
// @desc    Get all game scores
// @access  Private/Admin
router.get('/game-scores', (req, res) => {
  // TODO: Get all game scores logic
  res.json({ message: 'Get all game scores endpoint' });
});

export default router;

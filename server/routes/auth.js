import express from 'express';
import bcrypt from 'bcryptjs';
import { auth, isAdmin } from '../middleware/auth.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const usernameRegex = /^[a-zäöåA-ZÄÖÅ0-9_]{2,30}$/; // Käyttäjätunnus voi sisältää kirjaimia, numeroita ja alaviivoja, ja sen pituus on 2-30 merkkiä.

// rekisteröinti
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Tarkistetaan, että käyttäjätunnus ja salasana on annettu ja että salasana on vähintään 6 merkkiä pitkä.

    if (!username || !password) {
      return res.status(400).json({ message: 'Syötä käyttäjätunnus ja salasana' });
    }
    
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ message: 'Käyttäjätunnus voi sisältää vain kirjaimia, numeroita ja alaviivoja, ja sen pituus on 2-30 merkkiä' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Salasana täytyy olla vähintään 6 merkkiä pitkä' });
    }

// Tarkistetaan onko käyttäjätunnus jo olemassa.
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'Käyttäjätunnus on jo käytössä' });
    }

// Salasanaa ei tallenneta sellaisenaan.
// Ennen tallennusta siitä luodaan bcrypt-hash.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user = new User({ username, password: hashedPassword });
    await user.save();
    
// Token sisältää käyttäjän tunnisteen ja admin-oikeuden,
// ja se vanhenee yhden tunnin kuluttua.
    const payload = { user: { id: user.id, isAdmin: user.isAdmin } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token, user: { id: user._id, username: user.username, isAdmin: user.isAdmin } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Syötä käyttäjätunnus ja salasana' });
    }

    if (!usernameRegex.test(username)) {
      return res.status(400).json({ message: 'Käyttäjätunnus voi sisältää vain kirjaimia, numeroita ja alaviivoja, ja sen pituus on 2-30 merkkiä' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Virheelliset kirjautumistiedot' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Virheelliset kirjautumistiedot' });
    }

    const payload = { user: { id: user._id, isAdmin: user.isAdmin } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, username: user.username, isAdmin: user.isAdmin } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin login
router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Admin access denied' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Virheelliset kirjautumistiedot' });
    }

    const payload = { user: { id: user._id, isAdmin: true } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete account
router.delete('/delete-account', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'Account deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Review = require('../models/Review');
const Movie = require('../models/Movie');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Register
router.post('/register', [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email 
      } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').exists().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email 
      } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /users/:id - Retrieve user profile and review history
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: 'reviews',
        populate: { path: 'movie', select: 'title image' }
      })
      .populate('watchlist')
      .select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /users/:id - Update user profile
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { username, email }, 
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /users/:id/watchlist - Retrieve user's watchlist
router.get('/:id/watchlist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('watchlist');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /users/:id/watchlist - Add movie to watchlist
router.post('/:id/watchlist', auth, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { movieId } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }
    
    await user.populate('watchlist');
    res.json(user.watchlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /users/:id/watchlist/:movieId - Remove movie from watchlist
router.delete('/:id/watchlist/:movieId', auth, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const user = await User.findById(req.params.id);
    user.watchlist = user.watchlist.filter(
      (movieId) => movieId.toString() !== req.params.movieId
    );
    await user.save();
    await user.populate('watchlist');
    res.json(user.watchlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

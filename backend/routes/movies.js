const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Review = require('../models/Review');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// GET /movies - Retrieve all movies (with pagination and filtering)
router.get('/', async (req, res) => {
  try {
    const { genre, year, rating, page = 1, limit = 10, search } = req.query;
    const filter = {};
    
    if (genre) filter.genre = { $in: [genre] };
    if (year) filter.year = parseInt(year);
    if (rating) filter.rating = { $gte: parseFloat(rating) };
    if (search) filter.title = { $regex: search, $options: 'i' };

    const movies = await Movie.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Movie.countDocuments(filter);
    
    res.json({
      movies,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /movies/featured - Get featured movies
router.get('/featured', async (req, res) => {
  try {
    const movies = await Movie.find({ rating: { $gte: 4.0 } })
      .sort({ rating: -1 })
      .limit(8);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /movies/:id - Retrieve a specific movie with reviews
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate({
        path: 'reviews',
        populate: { path: 'user', select: 'username' }
      });
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /movies - Add a new movie (admin only - simplified for now)
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('genre').isArray().withMessage('Genre must be an array'),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Valid year required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /movies/:id/reviews - Retrieve reviews for a specific movie
router.get('/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.id })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /movies/:id/reviews - Submit a new review for a movie
router.post('/:id/reviews', auth, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('text').optional().isLength({ max: 1000 }).withMessage('Review text too long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user already reviewed this movie
    const existingReview = await Review.findOne({ 
      user: req.user._id, 
      movie: req.params.id 
    });
    
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this movie' });
    }

    const review = new Review({ 
      ...req.body, 
      movie: req.params.id, 
      user: req.user._id 
    });
    
    await review.save();
    
    // Add review to user's reviews
    await User.findByIdAndUpdate(req.user._id, { 
      $push: { reviews: review._id } 
    });
    
    // Add review to movie's reviews and update average rating
    const movie = await Movie.findById(req.params.id);
    movie.reviews.push(review._id);
    
    const allReviews = await Review.find({ movie: req.params.id });
    const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
    movie.rating = parseFloat(avgRating.toFixed(1));
    
    await movie.save();
    
    await review.populate('user', 'username');
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

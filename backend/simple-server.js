const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Basic middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Simple movies route 
app.get('/api/movies', async (req, res) => {
  try {
    // Connect to MongoDB and fetch movies
    const Movie = require('./models/Movie');
    const movies = await Movie.find().limit(10);
    res.json({ movies });
  } catch (error) {
    console.error('Error:', error);
    res.json({ 
      movies: [
        {
          _id: '1',
          title: 'Test Movie',
          description: 'This is a test movie',
          genre: ['Action'],
          year: 2024,
          rating: 4.5,
          image: 'https://via.placeholder.com/300x400',
          reviews: []
        }
      ]
    });
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movies')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    // Start server anyway for testing
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT} (without MongoDB)`);
    });
  });

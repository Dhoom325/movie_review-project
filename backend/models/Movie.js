const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: [{ type: String, required: true }],
  year: { type: Number, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  image: { type: String, required: true }, // URL to movie poster
  trailer: String, // URL to trailer
  cast: [{
    name: { type: String, required: true },
    image: String, // URL to cast image
    role: String
  }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', MovieSchema);

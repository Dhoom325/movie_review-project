import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { movieService } from '../services/movieService';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: '', comment: '' });
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = useCallback(async () => {
    try {
      setLoading(true);
      const movieData = await movieService.getMovieById(id);
      
      if (movieData.Response === 'True') {
        const formattedMovie = movieService.formatMovieData(movieData);
        setMovie(formattedMovie);
        
        // Load mock reviews for this movie
        const mockReviews = [
          {
            id: 1,
            movieId: id,
            user: { name: "John Doe" },
            rating: 5,
            comment: "Absolutely incredible! One of the best movies I've ever seen.",
            createdAt: new Date('2023-10-15')
          },
          {
            id: 2,
            movieId: id,
            user: { name: "Jane Smith" },
            rating: 4,
            comment: "Great movie with amazing performances and cinematography.",
            createdAt: new Date('2023-10-20')
          }
        ];
        setReviews(mockReviews);
      } else {
        console.error('Movie not found');
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // In a real app, this would make an API call
    const review = {
      id: Date.now(),
      movieId: id,
      user: { name: user?.username || "Current User" },
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date()
    };
    setReviews([...reviews, review]);
    setNewReview({ rating: '', comment: '' });
    setShowReviewForm(false);
  };

  const handleWatchlistToggle = () => {
    // In a real app, this would make an API call to add/remove from watchlist
    setIsInWatchlist(!isInWatchlist);
    if (!isInWatchlist) {
      alert('Movie added to watchlist!');
    } else {
      alert('Movie removed from watchlist!');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <h2>Loading movie details...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="error-container">
        <h2>Movie not found</h2>
        <p>The movie you're looking for doesn't exist or couldn't be loaded.</p>
      </div>
    );
  }

  return (
    <div className="movie-detail-page">
      <div className="movie-header">
        <div className="container">
          <div className="movie-hero">
            <div className="movie-poster">
              <img src={movie.image} alt={movie.title} />
              {isAuthenticated && (
                <button 
                  className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
                  onClick={handleWatchlistToggle}
                >
                  {isInWatchlist ? '❤️ In Watchlist' : '🤍 Add to Watchlist'}
                </button>
              )}
            </div>
            
            <div className="movie-info">
              <h1 className="movie-title">{movie.title}</h1>
              <div className="movie-meta">
                <span className="year">{movie.year}</span>
                <span className="rating">
                  {'⭐'.repeat(Math.floor(movie.rating))} {movie.rating.toFixed(1)}
                </span>
              </div>
              
              {/* Enhanced Ratings Section */}
              <div className="ratings-section">
                <div className="rating-item">
                  <span className="rating-label">IMDb:</span>
                  <span className="rating-value">{movie.imdbRating || `${movie.rating.toFixed(1)}/10`}</span>
                </div>
                <div className="rating-item">
                  <span className="rating-label">Rotten Tomatoes:</span>
                  <span className="rating-value">{movie.rottenTomatoes || 'N/A'}</span>
                </div>
                <div className="rating-item">
                  <span className="rating-label">Box Office:</span>
                  <span className="rating-value">{movie.boxOffice}</span>
                </div>
              </div>
              
              <div className="genres">
                {movie.genre.map((g, index) => (
                  <span key={index} className="genre-tag">{g}</span>
                ))}
              </div>
              
              <p className="description">{movie.description}</p>
              
              {/* Trailer Section */}
              {movie.trailer && (
                <div className="trailer-section">
                  <h3>🎬 Watch Trailer</h3>
                  <div className="trailer-container">
                    <iframe
                      width="100%"
                      height="315"
                      src={movie.trailer}
                      title={`${movie.title} Trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="cast-section">
          <h2>Cast & Crew</h2>
          <div className="cast-grid">
            {movie.cast && movie.cast.length > 0 ? (
              movie.cast.map((actor, index) => (
                <div key={index} className="cast-member">
                  <span className="actor-name">{actor}</span>
                </div>
              ))
            ) : (
              <p>Cast information not available</p>
            )}
          </div>
          {movie.director && (
            <div className="crew-info">
              <p><strong>Director:</strong> {movie.director}</p>
              {movie.runtime && <p><strong>Runtime:</strong> {movie.runtime}</p>}
              {movie.released && <p><strong>Released:</strong> {movie.released}</p>}
            </div>
          )}
        </section>

        <section className="reviews-section">
          <div className="reviews-header">
            <h2>Reviews</h2>
            {isAuthenticated && (
              <button 
                className="add-review-btn"
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                Add Review
              </button>
            )}
          </div>

          {showReviewForm && (
            <div className="review-form-container">
              <h3>Write a Review</h3>
              <form onSubmit={handleSubmitReview}>
                <div className="rating-input">
                  <label>Rating:</label>
                  <select 
                    value={newReview.rating} 
                    onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                    required
                  >
                    <option value="">Select rating</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Write your review..."
                  required
                  rows="4"
                ></textarea>
                <div className="form-buttons">
                  <button type="submit">Submit Review</button>
                  <button type="button" onClick={() => setShowReviewForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div className="reviews-list">
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">{review.user?.name || 'Anonymous'}</span>
                    <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="no-reviews">No reviews yet. Be the first to review this movie!</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MovieDetailPage;

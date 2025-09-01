import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../store/moviesSlice';
import './MovieCard.css';

const MovieCard = ({ movie, showWatchlistButton = false }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { watchlist } = useSelector((state) => state.movies);
  
  const isInWatchlist = watchlist.some(w => w._id === movie._id);

  const handleWatchlistToggle = (e) => {
    e.preventDefault();
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie._id));
    } else {
      dispatch(addToWatchlist(movie._id));
    }
  };

  return (
    <div className="movie-card">
      <Link to={`/movies/${movie._id}`} className="movie-link">
        <div className="movie-image">
          <img src={movie.image} alt={movie.title} />
          {showWatchlistButton && isAuthenticated && (
            <button 
              className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
              onClick={handleWatchlistToggle}
            >
              {isInWatchlist ? '❤️' : '🤍'}
            </button>
          )}
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year">{movie.year}</p>
          <div className="movie-genre">
            {movie.genre.slice(0, 2).map((g, index) => (
              <span key={index} className="genre-tag">{g}</span>
            ))}
          </div>
          <div className="movie-rating">
            <span className="stars">{'⭐'.repeat(Math.floor(movie.rating))}</span>
            <span className="rating-number">{movie.rating.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

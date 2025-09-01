import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// Static movie data to display
const featuredMovies = [
  {
    _id: '1',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    genre: ['Action', 'Crime', 'Drama'],
    year: 2008,
    rating: 4.9,
    image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg'
  },
  {
    _id: '2',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    genre: ['Sci-Fi', 'Thriller', 'Action'],
    year: 2010,
    rating: 4.8,
    image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg'
  },
  {
    _id: '3',
    title: 'The Matrix',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    genre: ['Action', 'Sci-Fi'],
    year: 1999,
    rating: 4.7,
    image: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg'
  },
  {
    _id: '4',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanitys survival.',
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    year: 2014,
    rating: 4.6,
    image: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg'
  }
];

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🎬 Movie Review Platform</h1>
          <p className="hero-subtitle">
            Discover amazing movies, read reviews, and share your thoughts
          </p>
          <Link to="/movies" className="hero-cta">
            Browse All Movies
          </Link>
        </div>
      </div>

      <div className="container">
        <section className="featured-section">
          <h2 className="section-title">Featured Movies</h2>
          <div className="movies-grid">
            {featuredMovies.map((movie) => (
              <div key={movie._id} className="movie-card">
                <Link to={`/movies/${movie._id}`} className="movie-link">
                  <div className="movie-image">
                    <img src={movie.image} alt={movie.title} />
                  </div>
                  <div className="movie-info">
                    <h3 className="movie-title">{movie.title}</h3>
                    <div className="movie-meta">
                      <span className="movie-year">{movie.year}</span>
                      <span className="movie-rating">⭐ {movie.rating}</span>
                    </div>
                    <div className="movie-genres">
                      {movie.genre.join(' • ')}
                    </div>
                    <p className="movie-description">{movie.description.substring(0, 100)}...</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>🎭</h3>
              <div className="stat-number">6+</div>
              <div className="stat-label">Movies Available</div>
            </div>
            <div className="stat-card">
              <h3>⭐</h3>
              <div className="stat-number">4.8</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-card">
              <h3>👥</h3>
              <div className="stat-number">1000+</div>
              <div className="stat-label">Active Users</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

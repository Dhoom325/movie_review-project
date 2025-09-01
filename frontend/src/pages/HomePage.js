import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { movieService } from '../services/movieService';
import './HomePage.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    console.log('🏠 HomePage mounted');
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      console.log('🎬 Starting to fetch popular movies...');
      setLoading(true);
      const popularMovies = await movieService.getPopularMovies();
      console.log('📽️ Movies fetched:', popularMovies.length, 'movies');
      setMovies(popularMovies);
    } catch (error) {
      console.error('❌ Error fetching popular movies:', error);
      // Fallback premium movies to ensure something shows
      setMovies([
        {
          id: 'tt0468569',
          title: "The Dark Knight",
          year: 2008,
          genre: ["Action", "Crime", "Drama"],
          rating: 9.0,
          description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
          image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
          cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"]
        },
        {
          id: 'tt1375666',
          title: "Inception",
          year: 2010,
          genre: ["Action", "Sci-Fi", "Thriller"],
          rating: 8.8,
          description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
          image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
          cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Elliot Page"]
        }
      ]);
    } finally {
      setLoading(false);
      console.log('✅ Loading finished');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setIsSearching(true);
      const results = await movieService.searchMovies(searchQuery);
      if (results.Response === 'True') {
        const formattedResults = results.Search.map(movie => ({
          id: movie.imdbID,
          title: movie.Title,
          year: parseInt(movie.Year),
          image: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image',
          description: `${movie.Title} (${movie.Year})`
        }));
        setSearchResults(formattedResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const displayMovies = searchResults.length > 0 ? searchResults : movies;
  const isDisplayingSearchResults = searchResults.length > 0;

  if (loading) {
    return (
      <div className="homepage">
        <div className="container">
          <div className="loading-spinner">
            <h2>Loading amazing movies...</h2>
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="container">
            <h1 className="hero-title">
              🎬 Premium Movie Platform
            </h1>
            <p className="hero-subtitle">
              Discover amazing movies with trailers, reviews, and ratings
            </p>
            
            {/* Search Form */}
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search for movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-btn" disabled={isSearching}>
                  {isSearching ? '🔍' : '🔍'}
                </button>
                {searchQuery && (
                  <button type="button" onClick={clearSearch} className="clear-btn">
                    ✕
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="movies-section">
        <div className="container">
          <div className="section-header">
            <h2>
              {isDisplayingSearchResults 
                ? `Search Results for "${searchQuery}"` 
                : 'Featured Premium Movies'}
            </h2>
            {isDisplayingSearchResults && (
              <button onClick={clearSearch} className="show-all-btn">
                Show All Movies
              </button>
            )}
          </div>

          {displayMovies.length > 0 ? (
            <div className="movies-grid">
              {displayMovies.map((movie) => (
                <Link 
                  to={`/movies/${movie.id}`} 
                  key={movie.id}
                  className="movie-card"
                >
                  <div className="movie-poster">
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                      }}
                    />
                    <div className="movie-overlay">
                      <div className="movie-info">
                        <h3 className="movie-title">{movie.title}</h3>
                        <p className="movie-year">{movie.year}</p>
                        {movie.rating && (
                          <div className="movie-rating">
                            ⭐ {movie.rating}/10
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : isDisplayingSearchResults ? (
            <div className="no-results">
              <h3>No movies found</h3>
              <p>Try searching with different keywords</p>
              <button onClick={clearSearch} className="back-btn">
                Back to Popular Movies
              </button>
            </div>
          ) : (
            <div className="no-movies">
              <h3>No movies available</h3>
              <p>Please try again later</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

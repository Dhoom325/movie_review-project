import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [activeTab, setActiveTab] = useState('reviews');
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, token]);

  const fetchWatchlist = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/${user.id}/watchlist`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWatchlist(response.data);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  }, [user, token]);

  useEffect(() => {
    if (user && token) {
      fetchUserData();
      fetchWatchlist();
    }
  }, [user, token, fetchUserData, fetchWatchlist]);

  if (isLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!userData) {
    return <div className="error">Error loading profile data</div>;
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-info">
            <div className="avatar">
              {userData.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <h1>{userData.username}</h1>
              <p>{userData.email}</p>
              <div className="stats">
                <span>{userData.reviews?.length || 0} Reviews</span>
                <span>{watchlist.length} Movies in Watchlist</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              My Reviews
            </button>
            <button
              className={`tab ${activeTab === 'watchlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('watchlist')}
            >
              My Watchlist
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'reviews' && (
              <div className="reviews-tab">
                <h2>My Reviews ({userData.reviews?.length || 0})</h2>
                {userData.reviews && userData.reviews.length > 0 ? (
                  <div className="reviews-list">
                    {userData.reviews.map((review, index) => (
                      <div key={index} className="review-card">
                        <div className="review-movie">
                          {review.movie?.image && (
                            <img src={review.movie.image} alt={review.movie.title} />
                          )}
                          <div className="movie-info">
                            <h3>{review.movie?.title || 'Movie Title'}</h3>
                            <div className="review-rating">
                              {'⭐'.repeat(review.rating)}
                            </div>
                            <div className="review-date">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        {review.text && (
                          <p className="review-text">{review.text}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <h3>No reviews yet</h3>
                    <p>Start reviewing movies to see them here!</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'watchlist' && (
              <div className="watchlist-tab">
                <h2>My Watchlist ({watchlist.length})</h2>
                {watchlist.length > 0 ? (
                  <div className="watchlist-grid">
                    {watchlist.map((movie) => (
                      <MovieCard key={movie._id} movie={movie} />
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <h3>Your watchlist is empty</h3>
                    <p>Add movies to your watchlist to keep track of what you want to watch!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

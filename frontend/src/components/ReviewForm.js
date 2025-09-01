import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitReview } from '../store/moviesSlice';
import './ReviewForm.css';

const ReviewForm = ({ movieId }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to submit a review');
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(submitReview({ movieId, rating, text })).unwrap();
      setText('');
      setRating(5);
      alert('Review submitted successfully!');
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="review-form-container">
        <p className="login-prompt">Please log in to submit a review.</p>
      </div>
    );
  }

  return (
    <div className="review-form-container">
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="rating-section">
          <label htmlFor="rating">Rating:</label>
          <select 
            id="rating"
            value={rating} 
            onChange={(e) => setRating(Number(e.target.value))}
            className="rating-select"
          >
            {[1, 2, 3, 4, 5].map(star => (
              <option key={star} value={star}>
                {'⭐'.repeat(star)} ({star})
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-section">
          <label htmlFor="reviewText">Review:</label>
          <textarea 
            id="reviewText"
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts about this movie..."
            className="review-textarea"
            rows="4"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-btn"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;

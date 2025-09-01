import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to get auth headers
const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

// Async thunks
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ page = 1, limit = 12, search = '', genre = '', year = '', rating = '' }) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (search) params.append('search', search);
    if (genre) params.append('genre', genre);
    if (year) params.append('year', year);
    if (rating) params.append('rating', rating);

    const response = await axios.get(`${API_BASE_URL}/movies?${params}`);
    return response.data;
  }
);

export const fetchFeaturedMovies = createAsyncThunk(
  'movies/fetchFeaturedMovies',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/movies`);
    return response.data;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId) => {
    const response = await axios.get(`${API_BASE_URL}/movies/${movieId}`);
    return response.data;
  }
);

export const submitReview = createAsyncThunk(
  'movies/submitReview',
  async ({ movieId, rating, text }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.post(
        `${API_BASE_URL}/movies/${movieId}/reviews`,
        { rating, text },
        getAuthHeaders(auth.token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const addToWatchlist = createAsyncThunk(
  'movies/addToWatchlist',
  async (movieId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.post(
        `${API_BASE_URL}/users/${auth.user.id}/watchlist`,
        { movieId },
        getAuthHeaders(auth.token)
      );
      return { movieId, watchlist: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const removeFromWatchlist = createAsyncThunk(
  'movies/removeFromWatchlist',
  async (movieId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await axios.delete(
        `${API_BASE_URL}/users/${auth.user.id}/watchlist/${movieId}`,
        getAuthHeaders(auth.token)
      );
      return movieId;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    featuredMovies: [],
    currentMovie: null,
    watchlist: [],
    isLoading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      total: 0,
    },
    filters: {
      search: '',
      genre: '',
      year: '',
      rating: '',
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload.movies;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
        };
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeaturedMovies.fulfilled, (state, action) => {
        state.featuredMovies = action.payload;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        if (state.currentMovie) {
          state.currentMovie.reviews.unshift(action.payload);
        }
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.watchlist = action.payload.watchlist;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.watchlist = state.watchlist.filter(
          (movie) => movie._id !== action.payload
        );
      });
  },
});

export const { setFilters, clearError } = moviesSlice.actions;
export default moviesSlice.reducer;

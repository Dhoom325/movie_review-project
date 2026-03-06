# Premium Movie Review Platform

A full-stack movie review platform featuring premium movies with trailers, ratings, and detailed information. Built with React, Node.js, and MongoDB.

##Live Demo

**[View Live Application](https://deft-pixie-3602c0.netlify.app/)**

> Experience the premium movie platform with 5 featured movies, trailers, and interactive features!

##Features

- **Premium Movie Collection**: Curated collection of 5 top-rated movies
- **Movie Trailers**: Embedded YouTube trailers for each movie
- **Multiple Rating Sources**: IMDb ratings, Rotten Tomatoes scores, and box office data
- **Search Functionality**: Search through the movie collection
- **Responsive Design**: Beautiful UI with glass-morphism effects
- **User Authentication**: JWT-based authentication system
- **Movie Details**: Comprehensive movie information including cast, director, runtime
- **Premium UI**: Modern design with enhanced visual effects

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Custom styling with glass-morphism effects

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start     # Start frontend on port 3000
   ```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/movie_review
JWT_SECRET=your_jwt_secret_here
PORT=3001
```

##Usage

1. **Homepage**: Browse the premium movie collection
2. **Search**: Use the search bar to find specific movies
3. **Movie Details**: Click on any movie to view detailed information including:
   - Movie trailer (embedded YouTube video)
   - IMDb rating and Rotten Tomatoes score
   - Box office performance
   - Cast and crew information
   - Plot summary
4. **Authentication**: Register/login to access personalized features

##UI Features

- **Glass-morphism Design**: Modern transparent effects
- **Responsive Layout**: Works on all device sizes
- **Hover Effects**: Interactive movie cards
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages

## Key Components

### Frontend
- `HomePage.js` - Main landing page with movie grid
- `MovieDetailPage.js` - Detailed movie view with trailer
- `movieService.js` - API service with static premium data
- `Navbar.js` - Navigation component

### Backend
- `index.js` - Express server setup
- `movieRoutes.js` - Movie API routes
- `authRoutes.js` - Authentication routes
- `Movie.js` - MongoDB movie model

## Deployment

### Live Application
- **Production URL**: [https://deft-pixie-3602c0.netlify.app/](https://deft-pixie-3602c0.netlify.app/)
- **Hosting**: Netlify (Auto-deployed from main branch)
- **Status**: Live and Functional


## Acknowledgments

- Movie data and images from IMDb API
- Trailer videos from YouTube
- Rating data from IMDb and Rotten Tomatoes

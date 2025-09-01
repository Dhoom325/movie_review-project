# 🎬 Premium Movie Review Platform

A full-stack movie review platform featuring premium movies with trailers, ratings, and detailed information. Built with React, Node.js, and MongoDB.

## ✨ Features

- **Premium Movie Collection**: Curated collection of 5 top-rated movies
- **Movie Trailers**: Embedded YouTube trailers for each movie
- **Multiple Rating Sources**: IMDb ratings, Rotten Tomatoes scores, and box office data
- **Search Functionality**: Search through the movie collection
- **Responsive Design**: Beautiful UI with glass-morphism effects
- **User Authentication**: JWT-based authentication system
- **Movie Details**: Comprehensive movie information including cast, director, runtime
- **Premium UI**: Modern design with enhanced visual effects

## 🎥 Featured Movies

1. **The Dark Knight** (2008) - 9.0/10 ⭐
2. **Inception** (2010) - 8.8/10 ⭐
3. **The Matrix** (1999) - 8.7/10 ⭐
4. **Interstellar** (2014) - 8.7/10 ⭐
5. **The Shawshank Redemption** (1994) - 9.3/10 ⭐

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

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dhoom325/movie_review-project.git
   cd movie_review-project
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string and JWT secret
   npm run seed  # Seed the database
   npm run dev   # Start backend on port 3001
   ```

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

## 📱 Usage

1. **Homepage**: Browse the premium movie collection
2. **Search**: Use the search bar to find specific movies
3. **Movie Details**: Click on any movie to view detailed information including:
   - Movie trailer (embedded YouTube video)
   - IMDb rating and Rotten Tomatoes score
   - Box office performance
   - Cast and crew information
   - Plot summary
4. **Authentication**: Register/login to access personalized features

## 🎨 UI Features

- **Glass-morphism Design**: Modern transparent effects
- **Responsive Layout**: Works on all device sizes
- **Hover Effects**: Interactive movie cards
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages

## 🔗 API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `GET /api/movies/search/:query` - Search movies

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

## 🌟 Key Components

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

## 🚀 Deployment

The application can be deployed to platforms like:
- **Frontend**: Netlify, Vercel, GitHub Pages
- **Backend**: Heroku, DigitalOcean, AWS
- **Database**: MongoDB Atlas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dhoom Kumar**
- GitHub: [@Dhoom325](https://github.com/Dhoom325)

## 🙏 Acknowledgments

- Movie data and images from OMDb API
- Trailer videos from YouTube
- Rating data from IMDb and Rotten Tomatoes

---

⭐ **Star this repository if you found it helpful!** ⭐

import axios from 'axios';

// Movie service configuration
const API_KEY = process.env.REACT_APP_OMDB_API_KEY || '623be4575349544ee9455ca07a829e5b';
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://www.omdbapi.com/';

// Create axios instance
const omdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY
  }
});

// Premium static movie data - fallback when API is not available
const PREMIUM_MOVIES = [
  {
    id: 'tt0468569',
    title: 'The Dark Knight',
    year: 2008,
    genre: ['Action', 'Crime', 'Drama'],
    rating: 9.0,
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
    director: 'Christopher Nolan',
    runtime: '152 min',
    released: '18 Jul 2008',
    boxOffice: '$1.005 billion',
    trailer: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    imdbRating: '9.0/10',
    rottenTomatoes: '94%'
  },
  {
    id: 'tt1375666',
    title: 'Inception',
    year: 2010,
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    rating: 8.8,
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy', 'Elliot Page'],
    director: 'Christopher Nolan',
    runtime: '148 min',
    released: '16 Jul 2010',
    boxOffice: '$836.8 million',
    trailer: 'https://www.youtube.com/embed/YoHD9XEInc0',
    imdbRating: '8.8/10',
    rottenTomatoes: '87%'
  },
  {
    id: 'tt0133093',
    title: 'The Matrix',
    year: 1999,
    genre: ['Action', 'Sci-Fi'],
    rating: 8.7,
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    image: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss', 'Hugo Weaving'],
    director: 'The Wachowskis',
    runtime: '136 min',
    released: '31 Mar 1999',
    boxOffice: '$467.2 million',
    trailer: 'https://www.youtube.com/embed/vKQi3bBA1y8',
    imdbRating: '8.7/10',
    rottenTomatoes: '88%'
  },
  {
    id: 'tt0816692',
    title: 'Interstellar',
    year: 2014,
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    rating: 8.7,
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    image: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxNS00OTA5LWEwMzUtYzQwMjE5MTdmNTM5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    director: 'Christopher Nolan',
    runtime: '169 min',
    released: '07 Nov 2014',
    boxOffice: '$701.8 million',
    trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    imdbRating: '8.7/10',
    rottenTomatoes: '73%'
  },
  {
    id: 'tt0111161',
    title: 'The Shawshank Redemption',
    year: 1994,
    genre: ['Drama'],
    rating: 9.3,
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    image: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler'],
    director: 'Frank Darabont',
    runtime: '142 min',
    released: '14 Oct 1994',
    boxOffice: '$16.3 million',
    trailer: 'https://www.youtube.com/embed/NmzuHjWmXOc',
    imdbRating: '9.3/10',
    rottenTomatoes: '91%'
  }
];

// Movie service functions
export const movieService = {
  // Search movies by title (using API first, then fallback)
  searchMovies: async (query, page = 1) => {
    try {
      // Try API first
      const response = await omdbApi.get('/', {
        params: {
          s: query,
          page: page,
          type: 'movie'
        }
      });

      if (response.data.Response === 'True') {
        return response.data;
      }
    } catch (error) {
      console.log('API error, using premium fallback data:', error.message);
    }

    // Premium movies for search (5 movies with enhanced features)
    const staticMovies = [
      { Title: "The Dark Knight", Year: "2008", imdbID: "tt0468569", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" },
      { Title: "Inception", Year: "2010", imdbID: "tt1375666", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" },
      { Title: "The Matrix", Year: "1999", imdbID: "tt0133093", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
      { Title: "Interstellar", Year: "2014", imdbID: "tt0816692", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxNS00OTA5LWEwMzUtYzQwMjE5MTdmNTM5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
      { Title: "The Shawshank Redemption", Year: "1994", imdbID: "tt0111161", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" }
    ];

    const filteredMovies = staticMovies.filter(movie => 
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );

    return {
      Search: filteredMovies,
      totalResults: filteredMovies.length.toString(),
      Response: filteredMovies.length > 0 ? "True" : "False"
    };
  },

  // Get movie details by ID (using API first, then fallback)
  getMovieById: async (id) => {
    try {
      // Try API first
      const response = await omdbApi.get('/', {
        params: {
          i: id,
          plot: 'full'
        }
      });

      if (response.data.Response === 'True') {
        return response.data;
      }
    } catch (error) {
      console.log(`API error for ${id}, using fallback data:`, error.message);
    }

    // Define premium movies with enhanced features in OMDb format
    const fallbackMovies = {
      'tt0468569': {
        Title: "The Dark Knight",
        Year: "2008", 
        imdbID: "tt0468569",
        Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
        Genre: "Action, Crime, Drama",
        imdbRating: "9.0",
        Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        Actors: "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
        Director: "Christopher Nolan",
        Runtime: "152 min",
        Released: "18 Jul 2008",
        BoxOffice: "$1,005,973,645",
        Trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
        RottenTomatoes: "94%",
        Response: "True"
      },
      'tt1375666': {
        Title: "Inception",
        Year: "2010", 
        imdbID: "tt1375666",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        Genre: "Action, Sci-Fi, Thriller",
        imdbRating: "8.8",
        Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        Actors: "Leonardo DiCaprio, Marion Cotillard, Tom Hardy, Elliot Page",
        Director: "Christopher Nolan",
        Runtime: "148 min",
        Released: "16 Jul 2010",
        BoxOffice: "$836,836,967",
        Trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
        RottenTomatoes: "87%",
        Response: "True"
      },
      'tt0133093': {
        Title: "The Matrix",
        Year: "1999",
        imdbID: "tt0133093", 
        Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        Genre: "Action, Sci-Fi",
        imdbRating: "8.7",
        Plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        Actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving",
        Director: "The Wachowskis",
        Runtime: "136 min",
        Released: "31 Mar 1999",
        BoxOffice: "$467,222,924",
        Trailer: "https://www.youtube.com/embed/vKQi3bBA1y8",
        RottenTomatoes: "88%",
        Response: "True"
      },
      'tt0816692': {
        Title: "Interstellar",
        Year: "2014",
        imdbID: "tt0816692",
        Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxNS00OTA5LWEwMzUtYzQwMjE5MTdmNTM5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        Genre: "Adventure, Drama, Sci-Fi",
        imdbRating: "8.7",
        Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine",
        Director: "Christopher Nolan",
        Runtime: "169 min",
        Released: "07 Nov 2014",
        BoxOffice: "$701,729,206",
        Trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
        RottenTomatoes: "73%",
        Response: "True"
      },
      'tt0111161': {
        Title: "The Shawshank Redemption", 
        Year: "1994",
        imdbID: "tt0111161",
        Poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        Genre: "Drama",
        imdbRating: "9.3",
        Plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        Actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
        Director: "Frank Darabont",
        Runtime: "142 min",
        Released: "14 Oct 1994",
        BoxOffice: "$16,293,417",
        Trailer: "https://www.youtube.com/embed/NmzuHjWmXOc",
        RottenTomatoes: "91%",
        Response: "True"
      }
    };

    // Return fallback data only - no API calls
    if (fallbackMovies[id]) {
      console.log(`Using static data for movie ID: ${id}`);
      return fallbackMovies[id];
    }

    // If movie not found in static data
    return { Response: "False", Error: "Movie not found in static database" };
  },

  // Get movie details by title
  getMovieByTitle: async (title, year = null) => {
    try {
      const params = {
        t: title,
        plot: 'full'
      };
      if (year) {
        params.y = year;
      }
      
      const response = await omdbApi.get('/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie by title:', error);
      throw error;
    }
  },

  // Get popular movies (using static data with enhanced features)
  getPopularMovies: async () => {
    // Return premium movies with complete features
    return [
      {
        id: 'tt0468569',
        title: 'The Dark Knight',
        year: 2008,
        genre: ['Action', 'Crime', 'Drama'],
        rating: 9.0,
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
        cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
        director: 'Christopher Nolan',
        runtime: '152 min',
        released: '18 Jul 2008',
        boxOffice: '$1.005 billion',
        trailer: 'https://www.youtube.com/embed/EXeTwQWrcwY',
        imdbRating: '9.0/10',
        rottenTomatoes: '94%'
      },
      {
        id: 'tt1375666',
        title: 'Inception',
        year: 2010,
        genre: ['Action', 'Sci-Fi', 'Thriller'],
        rating: 8.8,
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy', 'Elliot Page'],
        director: 'Christopher Nolan',
        runtime: '148 min',
        released: '16 Jul 2010',
        boxOffice: '$836.8 million',
        trailer: 'https://www.youtube.com/embed/YoHD9XEInc0',
        imdbRating: '8.8/10',
        rottenTomatoes: '87%'
      },
      {
        id: 'tt0133093',
        title: 'The Matrix',
        year: 1999,
        genre: ['Action', 'Sci-Fi'],
        rating: 8.7,
        description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        image: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss', 'Hugo Weaving'],
        director: 'The Wachowskis',
        runtime: '136 min',
        released: '31 Mar 1999',
        boxOffice: '$467.2 million',
        trailer: 'https://www.youtube.com/embed/vKQi3bBA1y8',
        imdbRating: '8.7/10',
        rottenTomatoes: '88%'
      },
      {
        id: 'tt0816692',
        title: 'Interstellar',
        year: 2014,
        genre: ['Adventure', 'Drama', 'Sci-Fi'],
        rating: 8.7,
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        image: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxNS00OTA5LWEwMzUtYzQwMjE5MTdmNTM5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
        director: 'Christopher Nolan',
        runtime: '169 min',
        released: '07 Nov 2014',
        boxOffice: '$701.8 million',
        trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E',
        imdbRating: '8.7/10',
        rottenTomatoes: '73%'
      },
      {
        id: 'tt0111161',
        title: 'The Shawshank Redemption',
        year: 1994,
        genre: ['Drama'],
        rating: 9.3,
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        image: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler'],
        director: 'Frank Darabont',
        runtime: '142 min',
        released: '14 Oct 1994',
        boxOffice: '$16.3 million',
        trailer: 'https://www.youtube.com/embed/NmzuHjWmXOc',
        imdbRating: '9.3/10',
        rottenTomatoes: '91%'
      }
    ];
  },

  // Format movie data from OMDb format to our app format with premium features
  formatMovieData: (omdbMovie) => {
    return {
      id: omdbMovie.imdbID,
      title: omdbMovie.Title,
      year: parseInt(omdbMovie.Year),
      genre: omdbMovie.Genre ? omdbMovie.Genre.split(', ') : [],
      rating: omdbMovie.imdbRating ? parseFloat(omdbMovie.imdbRating) : 0,
      description: omdbMovie.Plot || 'No description available',
      image: omdbMovie.Poster !== 'N/A' ? omdbMovie.Poster : 'https://via.placeholder.com/300x450?text=No+Image',
      cast: omdbMovie.Actors ? omdbMovie.Actors.split(', ') : [],
      director: omdbMovie.Director || 'Unknown',
      runtime: omdbMovie.Runtime || 'Unknown',
      released: omdbMovie.Released || 'Unknown',
      boxOffice: omdbMovie.BoxOffice || 'Unknown',
      trailer: omdbMovie.Trailer || null,
      imdbRating: omdbMovie.imdbRating ? `${omdbMovie.imdbRating}/10` : 'N/A',
      rottenTomatoes: omdbMovie.RottenTomatoes || 'N/A'
    };
  }
};

export default movieService;

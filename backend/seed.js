const mongoose = require('mongoose');
const Movie = require('./models/Movie');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seed() {
  await Movie.deleteMany({});

  const movies = [
    {
      title: 'Inception',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      genre: ['Sci-Fi', 'Thriller', 'Action'],
      year: 2010,
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg',
      trailer: 'https://www.youtube.com/embed/YoHD9XEInc0',
      cast: [
        { 
          name: 'Leonardo DiCaprio', 
          image: 'https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_UY264_CR10,0,178,264_AL_.jpg',
          role: 'Dom Cobb'
        },
        { 
          name: 'Joseph Gordon-Levitt', 
          image: 'https://m.media-amazon.com/images/M/MV5BMTY3NTk0NDI3Nl5BMl5BanBnXkFtZTgwNDA3NjY0MjE@._V1_UY264_CR5,0,178,264_AL_.jpg',
          role: 'Arthur'
        }
      ]
    },
    {
      title: 'The Matrix',
      description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
      genre: ['Action', 'Sci-Fi'],
      year: 1999,
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg',
      trailer: 'https://www.youtube.com/embed/vKQi3bBA1y8',
      cast: [
        { 
          name: 'Keanu Reeves', 
          image: 'https://m.media-amazon.com/images/M/MV5BODg3MzYwMjUtZmNlNC00OTIzLThlNGQtZTJkODk1ZDQ4NjIyXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_UY264_CR9,0,178,264_AL_.jpg',
          role: 'Neo'
        },
        { 
          name: 'Laurence Fishburne', 
          image: 'https://m.media-amazon.com/images/M/MV5BMTc0NDIzMjMwNV5BMl5BanBnXkFtZTcwNDE5ODUxMw@@._V1_UX178_CR0,0,178,264_AL_.jpg',
          role: 'Morpheus'
        }
      ]
    },
    {
      title: 'The Dark Knight',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
      genre: ['Action', 'Crime', 'Drama'],
      year: 2008,
      rating: 4.9,
      image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg',
      trailer: 'https://www.youtube.com/embed/EXeTwQWrcwY',
      cast: [
        { 
          name: 'Christian Bale', 
          image: 'https://m.media-amazon.com/images/M/MV5BMTkxMzk4MjQ4MF5BMl5BanBnXkFtZTcwMzExODQxOA@@._V1_UX178_CR0,0,178,264_AL_.jpg',
          role: 'Batman/Bruce Wayne'
        },
        { 
          name: 'Heath Ledger', 
          image: 'https://m.media-amazon.com/images/M/MV5BMTI2NTY0NzA4MF5BMl5BanBnXkFtZTYwMjE1MDE0._V1_UX178_CR0,0,178,264_AL_.jpg',
          role: 'Joker'
        }
      ]
    },
    {
      title: 'Interstellar',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanitys survival.',
      genre: ['Adventure', 'Drama', 'Sci-Fi'],
      year: 2014,
      rating: 4.6,
      image: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
      trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E',
      cast: [
        { 
          name: 'Matthew McConaughey', 
          image: 'https://m.media-amazon.com/images/M/MV5BMTg0MDc3ODUwOV5BMl5BanBnXkFtZTcwMTk2NjY4Nw@@._V1_UX178_CR0,0,178,264_AL_.jpg',
          role: 'Cooper'
        },
        { 
          name: 'Anne Hathaway', 
          image: 'https://m.media-amazon.com/images/M/MV5BMTRhNzA3NGMtZmQ1Mi00ZTViLTk3YjktMzIxZDI5YWM5YzFiXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_UX178_CR0,0,178,264_AL_.jpg',
          role: 'Brand'
        }
      ]
    },
    {
      title: 'Pulp Fiction',
      description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      genre: ['Crime', 'Drama'],
      year: 1994,
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg',
      trailer: 'https://www.youtube.com/embed/s7EdQ4FqbhY',
      cast: [
        { 
          name: 'John Travolta', 
          image: 'https://m.media-amazon.com/images/M/MV5BMTQzNjkzNTM2NF5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_UX178_CR0,0,178,264_AL_.jpg',
          role: 'Vincent Vega'
        },
        { 
          name: 'Samuel L. Jackson', 
          image: 'https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTcwNDE0MTUyMw@@._V1_UX178_CR0,0,178,264_AL_.jpg',
          role: 'Jules Winnfield'
        }
      ]
    },
    {
      title: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      genre: ['Drama'],
      year: 1994,
      rating: 4.9,
      image: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
      trailer: 'https://www.youtube.com/embed/NmzuHjWmXOc',
      cast: [
        { 
          name: 'Tim Robbins', 
          image: 'https://m.media-amazon.com/images/M/MV5BMTI1OTYxNzAxOF5BMl5BanBnXkFtZTYwNTE5ODI4._V1_UX178_CR0,0,178,264_AL_.jpg',
          role: 'Andy Dufresne'
        },
        { 
          name: 'Morgan Freeman', 
          image: 'https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_UX178_CR0,0,178,264_AL_.jpg',
          role: 'Ellis Boyd Redding'
        }
      ]
    }
  ];

  await Movie.insertMany(movies);
  console.log('✅ Movies seeded successfully!');
  console.log(`📊 Created ${movies.length} movies`);
  process.exit(0);
}

seed().catch(error => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});

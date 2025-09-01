const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Test movies route
app.get('/api/movies', (req, res) => {
  res.json({ movies: [
    { _id: '1', title: 'Test Movie', rating: 4.5 }
  ]});
});

app.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
});

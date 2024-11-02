const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Connect todo routes
app.use('/api/todos', todoRoutes);

// Route to check server
app.get('/', (req, res) => {
    res.send('Server is running');
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
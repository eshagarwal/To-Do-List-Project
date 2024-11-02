const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Route to check server
app.get('/', (req, res) => {
    res.send('Server is running');
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require('express');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/Notes');

// Load .env
dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/notes', notesRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

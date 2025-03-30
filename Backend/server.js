const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan')

require('dotenv').config();

// Import routes
const userRoutes = require('./src/routes/userRoutes');
// const collegeRoutes = require('./routes/collegeRoutes');

// Initialize express app
const app = express();
const PORT = 8000;

// Middleware
app.use(morgan("dev"))
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
// app.use('/api/colleges', collegeRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Saturne API - Server is running on port 8000!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/saturne_app')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      reason: error.reason ? error.reason.toString() : 'Unknown'
    });
  });
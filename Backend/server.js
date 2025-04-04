const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan')
const http = require('http');
const socketIO = require('socket.io');

require('dotenv').config();

// Import routes
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');
// const collegeRoutes = require('./routes/collegeRoutes');

// Initialize express app
const app = express();
const PORT = 8000;

const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIO(server, {
  cors: {
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST", "PUT"]
  }
});

app.set('io', io);

// Middleware
app.use(morgan("dev"))
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
// app.use('/api/colleges', collegeRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Saturne API - Server is running on port 8000!');
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  // Join a college-specific room
  socket.on('joinCollege', (college) => {
    console.log(`Socket ${socket.id} joined college: ${college}`);
    socket.join(college);
  });
  
  // Listen for disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/saturne_app')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    server.listen(PORT, () => {
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
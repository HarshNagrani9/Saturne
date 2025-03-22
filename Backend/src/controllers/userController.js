// backend/controllers/userController.js
const User = require('../models/userModel');

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, college } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User with this email already exists' 
      });
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      college
    });
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update education information (you already have this)
exports.updateEducation = async (req, res) => {
  try {
    const { email, level, specializations } = req.body;
    
    // Validate input
    if (!email || !level || !specializations) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, level, and specializations'
      });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update education information
    user.education = {
      level,
      specializations
    };
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update education error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
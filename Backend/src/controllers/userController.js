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


// backend/controllers/userController.js

// Add this method to your existing userController
exports.updateLinkedinProfile = async (req, res) => {
  try {
    const { email, linkedinProfile } = req.body;
    
    // Validate input
    if (!email || !linkedinProfile) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and LinkedIn profile URL'
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
    
    // Update LinkedIn profile
    user.linkedinProfile = linkedinProfile;
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update LinkedIn profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// backend/controllers/userController.js
// Add this method to your userController
exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email parameter is required'
      });
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user by email error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Add this method to your existing userController
exports.getUnverifiedUsers = async (req, res) => {
  try {
    const { email } = req.query;
    console.log('Request for unverified users with email:', email);
    
    // Find the current user to get their college
    const currentUser = await User.findOne({ email });
    console.log('Current user found:', currentUser ? 'Yes' : 'No');
    
    if (!currentUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    console.log('User college:', currentUser.college);
    
    // Find unverified users from the same college
    const unverifiedUsers = await User.find({
      college: currentUser.college,
      isVerified: false,
      email: { $ne: email }
    }).select('name email linkedinProfile verificationCount');
    
    console.log('Unverified users found:', unverifiedUsers.length);
    
    res.status(200).json({
      success: true,
      data: unverifiedUsers
    });
  } catch (error) {
    console.error('Get unverified users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Add this method to your existing userController
exports.verifyUser = async (req, res) => {
  try {
    const { verifierEmail, userToVerifyId } = req.body;
    
    // Find the verifier
    const verifier = await User.findOne({ email: verifierEmail });
    if (!verifier) {
      return res.status(404).json({ success: false, message: 'Verifier not found' });
    }
    
    // Find user to verify
    const userToVerify = await User.findById(userToVerifyId);
    if (!userToVerify) {
      return res.status(404).json({ success: false, message: 'User to verify not found' });
    }
    
    // Check if they're from the same college
    if (verifier.college !== userToVerify.college) {
      return res.status(403).json({ success: false, message: 'You can only verify users from your college' });
    }
    
    // Check if verifier has already verified this user
    const alreadyVerified = userToVerify.verifications.some(v => 
      v.verifiedBy.toString() === verifier._id.toString()
    );
    
    if (alreadyVerified) {
      return res.status(400).json({ success: false, message: 'You have already verified this user' });
    }
    
    // Add verification
    userToVerify.verifications.push({
      verifiedBy: verifier._id,
      verifiedAt: new Date()
    });
    
    userToVerify.verificationCount = userToVerify.verifications.length;
    
    // Check if user now has 3 verifications
    if (userToVerify.verificationCount >= 3) {
      userToVerify.isVerified = true;
    }
    
    await userToVerify.save();
    
    res.status(200).json({
      success: true,
      data: {
        verificationCount: userToVerify.verificationCount,
        isVerified: userToVerify.isVerified
      }
    });
  } catch (error) {
    console.error('Verify user error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
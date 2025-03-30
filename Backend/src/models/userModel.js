// backend/models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  college: {
    type: String,
    required: true
  },
  linkedinProfile: {
    type: String,
    trim: true
  },
  education: {
    level: {
      type: String,
      enum: ['Undergraduate', 'Postgraduate', 'Doctorate'],
      default: 'Undergraduate'
    },
    specializations: [{
      type: String
    }]
  },

  isVerified: { 
    type: Boolean, 
    default: false 
  },
  verifications: [{
    verifiedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    verifiedAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  verificationCount: { 
    type: Number, 
    default: 0 
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
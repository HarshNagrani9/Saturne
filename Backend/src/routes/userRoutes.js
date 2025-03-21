// backend/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Create new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Update education information
router.put('/education', userController.updateEducation);

module.exports = router;
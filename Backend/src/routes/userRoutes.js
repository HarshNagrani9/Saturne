// backend/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Create new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

//Add the linkedin profile 
router.put('/linkedin', userController.updateLinkedinProfile);

// Update education information
router.put('/education', userController.updateEducation);

//Getting all the unverified users
//router.get('/unverified', userController.getUnverifiedUsers);
router.get('/unverified', userController.getUnverifiedUsers);

//Verifying the users
router.post('/verify', userController.verifyUser);

//Getting all the details using the email
router.get('/:email', userController.getUserByEmail)

module.exports = router;
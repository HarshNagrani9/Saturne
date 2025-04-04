// backend/routes/postRoutes.js
const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// Create a new post
router.post('/', postController.createPost);

// Get global posts
router.get('/global', postController.getGlobalPosts);

// Get college-specific posts
router.get('/college/:college', postController.getCollegePosts);

// Like/unlike a post
router.post('/like', postController.toggleLike);

// Add a comment
router.post('/comment', postController.addComment);

module.exports = router;
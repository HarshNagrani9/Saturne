// backend/controllers/postController.js
const Post = require('../models/PostModel');
const User = require('../models/userModel');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content, postType, authorId, imageUrl } = req.body;
    
    // Validate input
    if (!content || !postType || !authorId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide content, postType, and authorId'
      });
    }
    
    // Find author to get their name and college
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found'
      });
    }
    
    // Create the post
    const post = await Post.create({
      content,
      imageUrl: imageUrl || '',
      author: authorId,
      authorName: author.name,
      authorCollege: author.college,
      postType
    });


    // Get Socket.IO instance
    const io = req.app.get('io');

    // Emit event based on post type
    if (postType === 'global') {
        io.emit('postCreated', post);
      } else {
        io.to(author.college).emit('postCreated', post);
      }
    
    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get global posts
exports.getGlobalPosts = async (req, res) => {
  try {
    const posts = await Post.find({ postType: 'global' })
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Get global posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get college-specific posts
exports.getCollegePosts = async (req, res) => {
  try {
    const { college } = req.params;
    
    if (!college) {
      return res.status(400).json({
        success: false,
        message: 'College parameter is required'
      });
    }
    
    const posts = await Post.find({ 
      postType: 'college',
      authorCollege: college
    })
    .sort({ createdAt: -1 })
    .limit(20);
    
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Get college posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Like/unlike a post
exports.toggleLike = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    
    // Validate input
    if (!postId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Post ID and User ID are required'
      });
    }
    
    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Check if user already liked the post
    const alreadyLiked = post.likes.includes(userId);
    
    if (alreadyLiked) {
      // Unlike: Remove user from likes array
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      // Like: Add user to likes array
      post.likes.push(userId);
    }
    
    await post.save();

    // Get Socket.IO instance
    const io = req.app.get('io');

    // Emit like event
    io.emit('postLiked', {
        postId,
        userId,
        isLiked: !alreadyLiked,
        likeCount: post.likes.length
    });
    
    res.status(200).json({
      success: true,
      liked: !alreadyLiked,
      likeCount: post.likes.length
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const { postId, content, authorId } = req.body;
    
    // Validate input
    if (!postId || !content || !authorId) {
      return res.status(400).json({
        success: false,
        message: 'Post ID, content, and author ID are required'
      });
    }
    
    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Find author to get their name
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found'
      });
    }
    
    // Create new comment
    const newComment = {
      content,
      author: authorId,
      authorName: author.name
    };
    
    // Add comment to post
    post.comments.push(newComment);
    await post.save();

    // Get Socket.IO instance
    const io = req.app.get('io');
    
    // Emit comment event
    io.emit('commentAdded', {
      postId,
      comment: post.comments[post.comments.length - 1]
    });
    
    res.status(201).json({
      success: true,
      data: post.comments[post.comments.length - 1]
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
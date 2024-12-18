// routes/commentRoutes.js
const express = require('express');
const { addComment, getCommentsByPostId } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Updated route for adding a comment to a specific post
router.post('/:postId/comments', authMiddleware.verifyToken, addComment);

// Updated route to fetch all comments for a specific post
router.get('/:postId/comments', getCommentsByPostId);

module.exports = router;

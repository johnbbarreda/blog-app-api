// routes/postRoutes.js

const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.verifyToken, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', authMiddleware.verifyToken, updatePost);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, deletePost); 

module.exports = router;

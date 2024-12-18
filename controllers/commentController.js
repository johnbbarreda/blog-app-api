// controllers/commentController.js

const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
    try {
        const comment = new Comment({
            content: req.body.content,
            postId: req.params.postId,
            authorId: req.user.id,
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).populate('authorId', 'username');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

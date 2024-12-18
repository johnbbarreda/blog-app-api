const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const post = new Post({ ...req.body, authorId: req.user.id }); // Ensure authorId is set from the authenticated user
        await post.save();
        res.status(201).json(post); // Return the created post with a 201 status
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('authorId', 'username'); // Populate authorId to get username
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('authorId', 'username'); // Populate authorId to get username
        if (!post) return res.status(404).json({ message: "Post not found" }); // Handle not found case
        res.json(post); // Return the post details
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        // Check if the post exists and if the user is authorized to update it
        if (!post || post.authorId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" }); // Handle unauthorized access
        }

        Object.assign(post, req.body); // Update the post with new data
        await post.save(); // Save the updated post
        res.json(post); // Return the updated post details
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        // Check if the post exists and if the user is authorized to delete it
        if (!post || (post.authorId.toString() !== req.user.id && !req.user.isAdmin)) {
            return res.status(403).json({ message: "Unauthorized" }); // Handle unauthorized access
        }

        await post.remove(); // Remove the post from the database
        res.json({ message: "Post deleted" }); // Confirm deletion
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
};

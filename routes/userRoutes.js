// routes/userRoutes.js
const express = require('express');
const { register, login, getUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', authMiddleware.verifyToken, getUser); // Protected route

module.exports = router;

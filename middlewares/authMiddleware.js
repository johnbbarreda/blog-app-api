const jwt = require('jsonwebtoken');

// Middleware to verify the token
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).send("A token is required for authentication");

    try {
        // Split the token to get the actual token part after "Bearer "
        const decodedToken = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decodedToken; // Attach decoded token to request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) { // Ensure req.user is defined and check for admin status
        return res.status(403).send("Access denied. Admins only.");
    }
    next(); // Proceed to the next middleware or route handler
};

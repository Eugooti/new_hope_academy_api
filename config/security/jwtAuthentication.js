const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken;  // Assuming the token is stored in cookies

    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            // Check if the error is due to expiration
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }

            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    });
};

module.exports = {authenticateToken};
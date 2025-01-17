const jwt = require('jsonwebtoken');
const {JwtTokens} = require("./jwtTokens");


// Refresh token route

const refreshAccessToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;  // Get refresh token from cookies

    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token not found, login again' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const jwtGenerator = new JwtTokens()

        // Generate a new access token
        const newAccessToken = jwtGenerator.generateAccessToken(user);

        res.cookie('authToken', newAccessToken, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: true,
            maxAge: 3600000,
        });

        return res.status(200).json({ message: 'Access token refreshed',newAccessToken });
    });
};

module.exports = { refreshAccessToken };

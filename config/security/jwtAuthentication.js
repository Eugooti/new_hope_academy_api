const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateRefreshToken = (user) => {
  return  jwt.sign(
      {user},
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: '1h'}
  )

}

const authenticateToken = (req,res,next) => {
  const token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')){
      const jwtToken = token.split(' ')[1];
      jwt.verify(jwtToken, process.env.SECRET_KEY, (err, decode) => {
          if (err) {
              return res.status(401).json({ message: 'Unauthorized!' });
          }else {
              req.user = decode

              // Check if token is expired
              if (decode.exp <= Date.now() / 1000) {
                  // Token is expired, send refresh token or require re-authentication
                  const refreshToken = generateRefreshToken(decode);
                  return res.status(401).json({
                      message: 'Token expired',
                      refreshToken // Optionally send refresh token to client
                  });
              }
              next()
          }
      })
  }
}


module.exports = {authenticateToken};

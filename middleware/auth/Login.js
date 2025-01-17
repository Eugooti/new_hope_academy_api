const passport = require('../../config/authConfig/passportConfig')
const jwt = require('jsonwebtoken')
const {JwtTokens} = require("../../config/security/jwtTokens");
require('dotenv').config();

const login = async (req,res,next) => {
    passport.authenticate('local',(err,user,info)=>{
        if (err){
            return next(err)
        }
        if (!user){
            return res.status(401).json({
                success:false,
                message:info.message
            })
        }

        req.login(user,(err)=>{
            if (err){
                return next(err)
            }

            const tokenGenerator = new JwtTokens();

            const User = {
                userId: user.id,
                email:user.email,
                roles:user.roles
            }

            const token = tokenGenerator.generateAccessToken(User)
            const refreshToken = tokenGenerator.generateRefreshToken(User)

            res.setHeader('Authorization', `Bearer ${token}`)
            res.setHeader('RefreshToken', `Bearer ${refreshToken}`)

            res.cookie('sessionCookie', req.sessionID, {
                httpOnly: true,
                secure: req.secure, // Conditionally set based on request protocol
                sameSite: 'strict'
            });

            res.cookie('authToken', token, {
                httpOnly: true,  // Prevents access from JavaScript
                secure: true,    // Only send over HTTPS
                sameSite: 'Strict', // Protects from CSRF attacks
                maxAge: 3600000  // Expires in 1 hour (1 hour = 3600 seconds = 3600000 milliseconds)
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,  // Prevents access from JavaScript
                secure: true,    // Only send over HTTPS
                sameSite: 'Strict', // Protects from CSRF attacks
                maxAge: 3600000  // Expires in 1 hour (1 hour = 3600 seconds = 3600000 milliseconds)
            });


            return res.status(200).json({
                success: true,
                message: 'Login successful',
                token,
                user,
                refreshToken
            });
        });
    })(req,res,next)
}

module.exports = {login}
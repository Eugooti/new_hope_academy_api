const passport = require('../../config/authConfig/passportConfig')
const jwt = require('jsonwebtoken')
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

            const token = jwt.sign(
                {
                    userId: user.id,
                    email:user.email,
                    roles:user.roles
                },
                process.env.SECRET_KEY,
                {expiresIn: '1h'}
            )

            res.setHeader('Authorization', `Bearer ${token}`)

            res.cookie('sessionCookie', req.sessionID, {
                httpOnly: true,
                secure: req.secure, // Conditionally set based on request protocol
                sameSite: 'strict'
            });

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                token,
                user
            });
        });
    })(req,res,next)
}

module.exports = {login}

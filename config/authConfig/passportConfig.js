const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../model/Staff/staff.model')
const crypto = require('crypto')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    try {
        const user = await User.findById(id).select('-password -salt')
        if (!user){
            return done(null,false)
        }
        done(null,user)
    }catch (error) {
        done(error)
    }
})

passport.use(
    new LocalStrategy(
        {
            username:"email",
            password:'password'
        },
        async (email,password,done)=>{
            try {
                const user = await User.findOne({email})

                if (!user){
                    return done(null,false,{message:"User not found"})
                }

                const hashedPassword = crypto.createHash('sha256').update(password + user.salt).digest('hex');

                if (hashedPassword !== user.password) {
                    return done(null, false, { message: 'Invalid Password' });
                }

                return done(null,user)

            }catch (error) {

            }
        }
    )
)

module.exports = passport;

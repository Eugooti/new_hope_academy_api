const {login} = require('./Login')
const {logout} = require('./logout')

const authMethods =  ()=>{
    const methods = {}

    methods.login = async (req,res,next)=>{
        await login(req,res,next)
    }

    methods.logout = async (req,res)=>{
        await logout(req,res)
    }

    return methods
}

module.exports = {authMethods}

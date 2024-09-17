const {login} = require('./Login')
const {logout} = require('./logout')
const {UpdatePassword} = require("./UpdatePassword");


const authMethods =  (model)=>{
    const methods = {}

    methods.login = async (req,res,next)=>{
        await login(req,res,next)
    }

    methods.logout = async (req,res)=>{
        await logout(req,res)
    }

    methods.updatePassword = async (req,res)=>{
        await UpdatePassword(model,req,res)
    }

    return methods
}

module.exports = {authMethods}

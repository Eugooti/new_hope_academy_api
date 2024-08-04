const {CreateEmployee} = require('./Create')
const {crudMethods} = require("../CRUDmiddleware");


const staffMethods = (model)=>{
    const methods = {...crudMethods(model)}

    methods.createEmployee = async (req,res)=>{
        await CreateEmployee(model,req,res)
    }

    return methods
}


module.exports = {staffMethods}

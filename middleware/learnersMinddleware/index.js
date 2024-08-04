const {admitLearner} = require('./admitLearner')
const {crudMethods} = require("../CRUDmiddleware");


const learnersMethods = (model)=>{
    const method = {...crudMethods(model)}

    method.admitLearner = async (req,res)=>{
        await admitLearner(model,req,res)
    }


    return method;

}

module.exports = {learnersMethods}

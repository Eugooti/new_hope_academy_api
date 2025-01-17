const {crudMethods} = require('../CRUDmiddleware/index')
const {createAssessment} = require("./createAssessment");
const {RecordOutcome} = require("./RecordOutcome");
const assessmentMethods = (model) => {
  const methods = {...crudMethods(model)}

    methods.createAssessment = async (req,res)=>{
      await createAssessment(model,req,res)
    }

    methods.recordOutcome = async (req,res)=>{
      await RecordOutcome(model,req,res);
    }

    return methods;
}

module.exports = {assessmentMethods}
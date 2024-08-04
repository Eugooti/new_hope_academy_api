const {crudMethods} = require("../CRUDmiddleware/index");
const {addLearnerToClub} = require("./addLearnerToClub");
const {addClinicRecord} = require("./Clinic");
const {counselingSession} = require("./counseling");


const learnerServiceMethods = (model)=>{

    const methods={...crudMethods(model)}

    methods.addLearnerToClub = async (req,res)=>{
        await addLearnerToClub(model,req,res)
    }

    methods.addClinicRecord = async (req,res)=>{
        await addClinicRecord(model,req,res)
    }

    methods.counselingSession= async (req,res)=>{
        await counselingSession(model,req,res)
    }

    return methods;
}

module.exports = {learnerServiceMethods}

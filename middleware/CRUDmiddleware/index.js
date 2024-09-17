const {update,updateByStaff,updateByLearner} = require("./update")
const {read,readById,readDataByLearnerAdmissionNumber,readDataByStaffEmployeeNumber, readByClassroomNo} = require("./read")
const {create} = require("./create")
const {remove,removeByLearnerAdmNo,removeByStaffId} = require("./delete")


const crudMethods = (model)=>{
    const methods = {};

    methods.create = async (req,res)=>{
        await create(model,req,res)
    }

    methods.readAll = async (req,res)=>{
        await read(model,req,res)
    }

    methods.readById = async (req,res)=>{
        await readById(model,req,res)
    }

    methods.readDataByLearnerAdmissionNumber = async (req,res)=>{
        await readDataByLearnerAdmissionNumber(model,req,res)
    }

    methods.readDataByStaffEmployeeNumber = async (req,res)=>{
        await readDataByStaffEmployeeNumber(model,req,res)
    }

    methods.readByClassroomNo = async (req,res)=>{
        await readByClassroomNo(model,req,res)
    }

    methods.update=async (req,res)=>{
        await update(model,req,res)
    }

    methods.updateByStaff= async (req,res)=>{
        await updateByStaff(model,req,res)
    }

    methods.updateByLearner = async (req,res)=>{
        await updateByLearner(model,req,res)
    }

    methods.remove = async (req,res)=>{
        await remove(model,req,res)
    }

    methods.removeByLearnerAdmNo = async (req,res)=>{
        await removeByLearnerAdmNo(model,req,res)
    }

    methods.removeByStaffId = async (req,res)=>{
        await removeByStaffId(model,req,res)
    }

    return methods

}


module.exports = {crudMethods}

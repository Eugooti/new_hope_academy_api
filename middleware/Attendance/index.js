const {teachersAttendance} = require("./TeachersAttendance");
const {markAttendance} = require('./LearnerAttendance')
const {crudMethods} = require("../CRUDmiddleware");
const {addLearnerToAttendance} = require("../Classroom_Middleware/addLearner");
const {transferLearner} = require("./transferLearner");

const attendanceMethod = (model) => {
  const methods = { ... crudMethods(model)}

    methods.staffAttendance = async (req,res)=>{
      await teachersAttendance(model,req,res)
    }

    methods.markLearnerAttendance = async (req,res)=>{
      await markAttendance(model,req,res)
    }

  methods.addLearnerToAttendance = async (req,res)=>{
    await addLearnerToAttendance(model,req,res)
  }

  methods.transferLearner = async (req,res)=>{
    await transferLearner(model,req,res)
  }

    return methods;
}

module.exports = {attendanceMethod}

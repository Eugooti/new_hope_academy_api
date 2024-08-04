const {teachersAttendance} = require("./TeachersAttendance");
const {markAttendance} = require('./LearnerAttendance')
const {crudMethods} = require("../CRUDmiddleware");

const attendanceMethod = (model) => {
  const methods = { ... crudMethods(model)}

    methods.staffAttendance = async (req,res)=>{
      await teachersAttendance(model,req,res)
    }

    methods.markLearnerAttendance = async (req,res)=>{
      await markAttendance(model,req,res)
    }

    return methods;
}

module.exports = {attendanceMethod}

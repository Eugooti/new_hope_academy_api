const mongoose = require('../../config/DB/index')
const {formatDate} = require("../../utils/formatDate");

const attendanceRecord = new mongoose.Schema({
    present:{type:Boolean,required:true},
    date:{type:String,required:true,default:formatDate},
    markedBy:{type:Number,required:true}
})

const staffAttendance = new mongoose.Schema({
    employeeNo:{type:Number,required:true,unique:true},
    name:{type:String,required:true},
    attendanceRecord:[attendanceRecord]
})

module.exports = mongoose.model("staffAttendance",staffAttendance)

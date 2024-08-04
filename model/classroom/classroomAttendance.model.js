const mongoose = require('../../config/DB/index')
const {formatDate} = require("../../utils/formatDate");


const attendance = new mongoose.Schema({
    present:{type:Boolean,required:true,default:false},
    date:{type:String,required:true,default:formatDate},
    markedBy:{type:Number,required:true}
})

const learnerRecord = new mongoose.Schema({
    admNo:{type:Number,required:true,unique:true},
    fullName:{type:String,required:true,unique:true},
    attendanceRecord:[attendance]
})

const classroomAttendanceRecord=new mongoose.Schema({
    classroomNo:{type:Number,required:true,unique:true},
    classroomFacilitator:{type:Number,required:true},
    attendanceRecord:[learnerRecord]
})

module.exports = mongoose.model("classRoomAttendance",classroomAttendanceRecord)

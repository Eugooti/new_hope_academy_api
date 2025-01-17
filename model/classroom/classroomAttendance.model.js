const mongoose = require('../../config/DB/index')
const {formatDate} = require("../../utils/formatDate");


const attendance = new mongoose.Schema({
    present:{type:Boolean,required:true,default:false},
    date:{type:String,required:true,default:formatDate},
    markedBy:{type:Number,required:true}
})

const learnerRecord = new mongoose.Schema({
    admNo:{type:Number,required:true},
    fullName:{type:String,required:true},
    gender:{type:String,required:true},
    attendanceRecord:[attendance]
})

const classroomAttendanceRecord=new mongoose.Schema({
    classroomNo:{type:String,required:true,unique:true},
    classroomName:{type:String,required:true,unique:true},
    classroomFacilitator:{type:String,required:true},
    employeeNo:{type:Number,required:true},
    learners:[learnerRecord],
    createdBy:{type:Number,required:true}

})

module.exports = mongoose.model("classRoomAttendance",classroomAttendanceRecord)

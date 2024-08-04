const mongoose = require('../../config/DB/index')

const lesson = new mongoose.Schema({
    lesson:{type:String,required:true},
    time:{type:String,required:true},
    moderator:{type:String,required:true},
})

const daySchedule = new mongoose.Schema({
    day:{type:Number,required:true,unique:true},
    lessons:[lesson]
})

const timetable = new mongoose.Schema({
    classroomNo:{type:Number,required:true,unique:true},
    classroomName:{type:String,required:true,unique:true},
    schedule:[daySchedule]
})

module.exports = mongoose.model('classroomTimetable',timetable)

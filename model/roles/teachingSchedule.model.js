const mongoose = require('../../config/DB/index')

const lesson = new mongoose.Schema({
    subject:{type:String,required:true},
    classroom:{type:String,required:true},
    time:{type:String,required:true},
})

const dayPlan = new mongoose.Schema({
    day:{type:Number,required:true},
    lessons:[lesson]
})

const teachersSchedule = new mongoose.Schema({
    employeeNo:{type:Number,required:true,unique:true},
    weekSchedule:[dayPlan]
})

module.exports = mongoose.model("teachersLessonSchedule",teachersSchedule)

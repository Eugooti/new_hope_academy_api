const mongoose = require('../../config/DB/index');

const {Schema} = mongoose

const learner = new Schema({
    name:{type:String,required:true},
    admNo:{type:String,required:true},
    marks:{type:Number,required:true,default:0},
})

const subjectScores = new Schema({
    subject: {type: String, required: true},
    meanScore: {type: String, required: true,default:0},
    totals: {type: Number, required: true,default:0},
    learners:[learner]
})

const dayAssessment = new Schema({
    day:{type:String,required:true},
    examOne:{type:String,required:true},
    examTwo:{type:String,required:true},
    examThree:{type:String,required:true},
})

const exam = new Schema({
    examName:{type:String,required:true},
    facilitator:{type:String,required:true},
    level:{type:String,required:true},
    classroomNo:{type:String,required:true},
    term:{type:String,required:true},
    startDate:{type:String,required:true},
    endDate:{type:String,required:true},
    outcome:[subjectScores],
    timetable:[dayAssessment],
})

module.exports = mongoose.model("exams",exam)
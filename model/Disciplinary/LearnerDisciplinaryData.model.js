const mongoose = require('../../config/DB/index')
const {formatDate} = require("../../utils/formatDate");


const accusation = new mongoose.Schema({
    accusation:{type:String,required:true}
})

const offence = new mongoose.Schema({
    offence:[accusation],
    handler:{type:Number,required:true},
    date:{type:String,required:true,default:formatDate},
    report:{type:String,required:true}
})

const LearnerDisciplinaryRecord = new mongoose.Schema({
    admNo:{type:Number,required:true, unique:true},
    fullName:{type:String,required:true},
    grade:{type:Number,required:true},
    offences:[offence]
})

module.exports = mongoose.model("LearnerDisciplinaryRecord",LearnerDisciplinaryRecord)

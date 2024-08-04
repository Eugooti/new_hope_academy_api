const mongoose = require('../../config/DB/index')
const {formatDate} = require("../../utils/formatDate");

const reminder = new mongoose.Schema({
    event:{type:String,require:true},
    time:{type:String,required:true},
    date:{type:String,required:true},
    createdAt:{type:String,required:true,default:formatDate}
})

const todo = new mongoose.Schema({
    employeeNo:{type:Number,required:true},
    reminders:[reminder]
})

module.exports = mongoose.model("todo",todo)

const mongoose = require('../../config/DB/index')

const lesson = new mongoose.Schema({
    classroom:{type:Number,required:true},
    subject:{type:String,required:true},
})

const teachingAssignment = new mongoose.Schema({
    moderatorId:{type:Number,required:true},
    lessons:[lesson]
})

module.exports = mongoose.model("teachingAssignment",teachingAssignment)

const mongoose = require('../../config/DB/index')

const interviews = new mongoose.Schema({
    role:{type:String,required:true},
    candidateName:{type:String,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:true},
    date:{type:String,required:true}
})

module.exports = mongoose.model('Interviews',interviews);

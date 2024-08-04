const mongoose = require('../../config/DB/index')

const responsibility = new mongoose.Schema({
    roles:{type:String,required:true}
})

const department = new mongoose.Schema({
    role:{type:String,required:true,unique:true},
    responsibilities:[responsibility],
    permissions:{type:[String],required:true},
    createdBy:{type:String,required:true},
})

module.exports = mongoose.model("departments",department)

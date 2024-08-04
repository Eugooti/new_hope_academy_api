const mongoose = require('../../config/DB/index')
const {formatDate} = require("../../utils/formatDate");

/**
 * this model stores all the staff profile record.
 * **/

const staff = new mongoose.Schema({
    employeeNo:{type:Number,required:true,unique:true},
    firstname:{type:String,required:true},
    lastName:{type:String,required:true},
    idNumber:{type:String,required:true,unique:true},
    gender:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    address:{type:String,required:true},
    phone:{type:String,required:true,unique:true},
    qualifications:[{type:String,required:true}],
    bankAccount:{type:String,required:true},
    salary:{type:String,required:true},
    password:{type:String,required:true},
    salt:{type:String,required:true},
    createdBy:{type:Number,required:true},
    registeredAT:{type:String,required:true,default:formatDate},
})

module.exports = mongoose.model("staff",staff)

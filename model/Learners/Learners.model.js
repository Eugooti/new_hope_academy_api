const mongoose = require('../../config/DB/index');
const {formatDate} = require("../../utils/formatDate");

const parent= new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    relationship:{type:String,required:true},
    idNo:{type:String,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:false},
})


const Learner = new mongoose.Schema({
    admNo:{type:String,required:true,unique:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    gender:{type:String,required:true},
    classroom:{type:Number,required:true},
    yob:{type:String,required:true},
    disability:{type:String,required:true},
    medicalCondition:{type:String,required:true},
    address:{type:String,required:true},
    UPINo:{type:String,required:false},
    birthCertificateNo:{type:String,required:false},
    parents:[parent],
    admittedBy:{type:Number,required:true},
    AdmittedAT:{type:String,required:true,default:formatDate},
})

module.exports = mongoose.model("Learner",Learner)

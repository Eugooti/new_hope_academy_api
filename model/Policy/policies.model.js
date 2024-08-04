const mongoose = require('../../config/DB/index');
const {formatDate} = require("../../utils/formatDate");


const policies = new mongoose.Schema({
    Policy:{type:String,required:true},
    TargetStakeholder:{type:[String],required:true},
    regulation:{type:[String],required:true},
    description:{type:String,required:true},
    createdAt:{type:String,required:true,default:formatDate},
    createdBy:{type:Number,required:true}
})


module.exports = mongoose.model("policies",policies)

const mongoose = require('../../config/DB/index')
const {formatDate} = require("../../utils/formatDate");

const complaints = new mongoose.Schema({
    complainant:{type:String,required:true},
    accused:{type:String,required:false},
    complain:{type:String,required:true},
    date:{type:String,required:true,default:formatDate},
    report:{type:String,required:true},
    handler:{type:Number,required:true}
})

module.exports = mongoose.model("complaints",complaints)

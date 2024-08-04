const mongoose = require('../../config/DB/index');
const {formatDate} = require("../../utils/formatDate");


const book= new mongoose.Schema({
    bookId:{type:String,required:true},
    title:{type:String,required:true},
})


const record = new mongoose.Schema({
    books:[book],
    status:{type:Boolean,required:true,default:false},
    BorrowHandler:{type:Number,required:true},
    returnHandler:{type:Number,required:false},
    dateBorrowed:{type:String,required:true,default:formatDate},
    returnDate:{type:String,required:true},
    lateReturnPenalty:{type:Number,required:false,default:0},
    cleared:{type:Boolean,required:true,default:false}
})

const borrowingRecord= new mongoose.Schema({
    borrowerId:{type:Number,required:true},
    record:[record],
})


module.exports = mongoose.model("borrowingRecord",borrowingRecord)

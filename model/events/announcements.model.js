const mongoose = require('../../config/DB/index');
const {formatDate} = require("../../utils/formatDate");


const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: String, required:true },
    createdAt:{type:String,required:true,default:formatDate},
    updatedAt: { type: Date, default: formatDate }
});

module.exports = mongoose.model("announcement",announcementSchema)

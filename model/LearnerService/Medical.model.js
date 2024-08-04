const mongoose = require('../../config/DB/index');
const {formatDate} = require("../../utils/formatDate");


const visitDetails = new mongoose.Schema({
    recordDate: { type: String, required: true ,default:formatDate },
    diagnosis: { type: [String], required: true },
    treatment: { type: [String], required: true },
    doctor: { type: String, required: true },
    notes: { type: String }
})

const medicalRecordSchema = new mongoose.Schema({
    admNo: { type: Number, required: true },
    fullName:{type:String,required:true},
    classroom:{type:Number,required:true},
    visits:[visitDetails]
});

module.exports = mongoose.model("medicalRecord",medicalRecordSchema)

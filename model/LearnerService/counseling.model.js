const mongoose = require('../../config/DB/index');
const {formatDate} = require("../../utils/formatDate");


const session = new mongoose.Schema({
    counselor: { type: Number, required: true },
    sessionDate: { type: Date, required: true },
    notes: { type: String, required: true },
    createdAt: { type: String, default: formatDate },
})

const counselingSessionSchema = new mongoose.Schema({
    admNo: { type: Number, required: true },
    fullName:{type:String,required:true},
    classroom:{type:Number,required:true},
    sessions:[session]

});

module.exports = mongoose.model("counselingSession",counselingSessionSchema)

const mongoose = require('../../config/DB');

const importantDates = new mongoose.Schema({
    date:{type:String,required: true},
    activity:{type:String,required: true},
    createdBy:{type:String,required: true},
})

module.exports = mongoose.model("importantDates",importantDates)

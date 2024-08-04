const mongoose = require('../../config/DB/index');

const students = new mongoose.Schema({
    fullName:{type:String,required:true},
    admNo:{type:Number,required:true},
    classroom:{type:Number,required:true}
})

const extracurricularActivitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    patron: { type:String,required:true },
    participants: [students]
});

module.exports = mongoose.model("Clubs",extracurricularActivitySchema)

const mongoose = require('../../config/DB/index')

const learner = new mongoose.Schema({
    name:{type:String,required:true},
    admNo:{type:Number,required:true,unique:true},
    gender:{type:String,required:true},
})

const classroom = new mongoose.Schema({
    classroomNo:{type:Number,required:true,unique:true},
    classroomName:{type:String,required:true,unique:true},
    classroomFacilitator:{type:String,required:true},
    population:{
        male:{type:Number,required:true,default:0},
        female:{type:Number,required:true,default:0},
        total:{type:Number,required:true,default:0}
    },
    learners:[learner],
    createdBy:{type:Number,required:true}
})


module.exports = mongoose.model("classrooms",classroom)

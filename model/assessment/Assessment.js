const mongoose = require('../../config/DB/index')

const {Schema} = mongoose;

const dayAssessment = new Schema({
    day:{type:String,required:true},
    examOne:{type:String,required:true},
    examTwo:{type:String,required:true},
    examThree:{type:String,required:true},
})

const assessmentResults = new Schema({
    name:{type:String,required:true},
    admNo:{type:String,required:true},
    mathematics:{type:Number,required:true,default:0},
    EnglishLanguage:{type:Number,required:true,default:0},
    EnglishLiterature:{type:Number,required:true,default:0},
    EnglishTotal:{type:Number,required:true,default:0},
    KiswahiliLugha:{type:Number,required:true,default:0},
    KiswahiliInsha:{type:Number,required:true,default:0},
    KiswahiliJumla:{type:Number,required:true,default:0},
    preTechnical:{type:Number,required:true,default:0},
    CreativeArtAndSports:{type:Number,required:true,default:0},
    AgricultureAndNutrition:{type:Number,required:true,default:0},
    environmentalActivity:{type:Number,required:true,default:0},
    total:{type:Number,required:true,default:0},
    position:{type:Number,required:true,default:0},
})

const assessmentAnalysis = new Schema({
    mathematics:{total:{type:Number,required:true,default:0},meanScore:{type:Number,required:true,default:0},},
    EnglishLanguage:{total:{type:Number,required:true,default:0},meanScore:{type:Number,required:true,default:0},},
    EnglishLiterature:{total:{type:Number,required:true,default:0},meanScore:{type:Number,required:true,default:0},},
    EnglishTotal:{total:{type:Number,required:true,default:0},meanScore:{type:Number,required:true,default:0},},
    KiswahiliLugha:{total:{type:Number,required:true,default:0},meanScore:{type:Number,required:true,default:0},},
    KiswahiliInsha:{total:{type:Number,required:true,default:0},meanScore:{type:Number,required:true,default:0},},
    KiswahiliJumla:{total:{type:Number,required:true,default:0},meanScore:{type:Number,required:true,default:0},},
    preTechnical:{total:{type:Number,required:true,default:0},meanScore:{type:Number,required:true,default:0},},
    CreativeArtAndSports:{total:{type:Number,required:true,default:0},meanScore:{type:Number,required:true,default:0},},
    AgricultureAndNutrition:{total:{type:Number,required:true,default:0},meanScore:{type:Number,required:true,default:0},},
    environmentalActivity:{total:{type:Number,required:true,default:0},meanScore:{type:Number,required:true,default:0},},
    total:{total:{type:Number,required:true,default:0},meanScore:{type:Number,required:true,default:0},},
    meanScore:{total:{type:Number,required:true,default:0},meanScore:{type:Number,required:true,default:0},},
})

const assessment = new Schema({
    examName:{type:String,required:true},
    classroom:{type:String,required:true},
    term:{type:String,required:true},
    startDate:{type:String,required:true},
    endDate:{type:String,required:true},
    timetable:[dayAssessment],
    learnerScores:[assessmentResults],
    assessmentAnalysis:assessmentAnalysis,
})

module.exports = mongoose.model('assessment',assessment)
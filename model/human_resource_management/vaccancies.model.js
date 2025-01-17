const mongoose = require('../../config/DB/index')

const requirement = new mongoose.Schema({
    requirement:{type:String,required:true},
})

const qualification = new mongoose.Schema({
    qualification:{type:String,requirement:true},
})

const vacancies = new mongoose.Schema({
    roleTitle:{type:String,required:true},
    Department:{type:String,required:true},
    requirements:[requirement],
    qualifications:[qualification],
    jobDescription:{type:String,required:true},
    salaryRange:{type:String,required:true}
})

module.exports = mongoose.model('vacancies',vacancies)

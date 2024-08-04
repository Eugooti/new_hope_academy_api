const mongoose = require('../../config/DB')

const payroll = new mongoose.Schema({
    employeeNumber: {type: Number, required:true},
    fullName: {type: String, required:true},
    salary: {type: Number, required:true},
    accountNumber: {type:Number, required:true,unique:true}
})

module.exports = mongoose.model("Payroll",payroll)

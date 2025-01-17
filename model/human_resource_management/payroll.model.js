const mongoose = require('../../config/DB')
const {formatDate} = require("../../utils/formatDate");
const {Schema} = mongoose

const allowance = new Schema({
    allowanceItem:{type:String,required: true},
    allowanceAmount:{type:Number,required: true,default:0},
})
const deduction = new Schema({
    deductionItem:{type:String,required: true},
    deductionAmount:{type:Number,required: true,default:0},
})



const payrollSchema = new Schema({
    employeeNo: { type: Number, required: true },
    fullName: { type: String, required: true },
    bankDetails: {
        bankName: {type: String,required:true},
        accountNumber: {type: String,},
        accountType: {type: String, enum: ['Checking', 'Savings']},
        paymentMethod: {type: String, enum: ['Bank Transfer', 'Check', 'Cash'], default: 'Bank Transfer'},
    },
    basicSalary: { type: Number, required: true },
    allowances: [allowance],
    deductions: [deduction],
    grossPay: {type: Number, required: true,default:0},
    netPay: { type: Number, required: true ,default:0 },
    createdAt: { type: Date, default: formatDate },
    createdBy: {type:Number,required: true},
    updatedBy: {type:Number,required: true},
});


module.exports = mongoose.model("Payroll",payrollSchema)

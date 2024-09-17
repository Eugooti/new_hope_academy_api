const mongoose = require('../../config/DB')
const {Schema} = mongoose

const payrollSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'FinanceStaff', required: true },
    salary: { type: Number, required: true },
    accountNo: { type: String, required: true },
    bonuses: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    netPay: { type: Number, default: function() { return this.salary + this.bonuses - this.deductions; } },
    paidAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Payroll",payrollSchema)

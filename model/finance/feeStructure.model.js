const mongoose = require('../../config/DB/index')

const {Schema} = mongoose

const feeItemSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    isOptional: { type: Boolean, default: false },
    description: { type: String,required:true }
});

const feeStructureSchema = new Schema({
    academicYear: { type: String, required: true },
    term: { type: String, required: true },
    grade: { type: String, required: true },
    feeItems: [feeItemSchema],
    createdDate: { type: Date, default: Date.now },
    createdBy: { type: Number, required: true },
    total: { type: Number, default: 0 ,required:true}
});

const studentFeeSchema = new Schema({
    admNo: { type: Number, required: true },
    feeStructure: { feeStructureSchema },
    totalAmount: { type: Number, required: true },
    lastPaidAmount: { type: Number, required: true, default: 0 },
    dueAmount: { type: Number, required: true },
    paymentStatus: { type: String, required: true, enum: ['Pending', 'Partially Paid', 'Settled'], default: 'Pending' },
    lastPaymentDate: { type: String },
    paymentHistory: [{
        paymentDate: { type: String, required: true },
        amountPaid: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        transactionId: { type: String }
    }],
    optionalFeeItems: [feeItemSchema]
});


const FeeItems = mongoose.model('feeItemSchema',feeItemSchema)
const FeeStructure = mongoose.model('FeeStructure', feeStructureSchema);
const StudentFee = mongoose.model('StudentFee', studentFeeSchema);

module.exports = {FeeItems,FeeStructure,StudentFee}

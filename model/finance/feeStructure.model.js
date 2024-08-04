const mongoose = require('../../config/DB/index')

const {Schema} = mongoose

const feeItemSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    isOptional: { type: Boolean, default: false },
    description: { type: String }
});

const feeStructureSchema = new Schema({
    academicYear: { type: String, required: true },
    term: { type: String, required: true },
    grade: { type: String, required: true },
    feeItems: [feeItemSchema],
    createdDate: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    total: { type: Number, default: 0 }
});

const studentFeeSchema = new Schema({
    studentId: { type: Number, required: true },
    feeStructureId: { feeStructureSchema },
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, required: true, default: 0 },
    dueAmount: { type: Number, required: true },
    paymentStatus: { type: String, required: true, enum: ['Pending', 'Partially Paid', 'Paid'], default: 'Pending' },
    lastPaymentDate: { type: Date },
    paymentHistory: [{
        paymentDate: { type: Date, required: true },
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

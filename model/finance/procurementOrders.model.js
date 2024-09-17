const mongoose = require('../../config/DB/index');
const {Schema} = mongoose

const procurementOrderSchema = new Schema({
    item: { type: String, required: true },
    expenseCategory: { type: String, required: true },
    quantity: { type: Number, required: true },
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Approved', 'Shipped', 'Delivered'], default: 'Pending' },
    paymentMethod: { type: Number, required: true },
    description: { type: Number, required: true },
    createdBy: { type: Number, required: true },
    createdAt: { type: Number, required: true },
    updatedAt: { type: Number, required: true },
});

module.exports = mongoose.model('ProcurementOrder', procurementOrderSchema);
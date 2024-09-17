const mongoose = require('../../config/DB/index');
const vendorSchema = new mongoose.Schema({
    vendorId: { type: String, required: true, unique: true },
    vendorName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    address: { type: String, required: true },
    products: { type: String, required: true },
});

module.exports = mongoose.model('Vendor', vendorSchema);

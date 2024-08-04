const mongoose = require('../../config/DB/index')

const budgetSchema = new mongoose.Schema({
    department: { type: String, required: true },
    fiscalYear: { type: String, required: true },
    amount: { type: Number, required: true },
    remainingAmount: { type: Number, required: true },
    description: { type: String }
});

module.exports = mongoose.model("budgetSchema",budgetSchema)

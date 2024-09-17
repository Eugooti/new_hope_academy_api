const mongoose = require('../../config/DB/index')

const budgetSchema = new mongoose.Schema({
    department: { type: String, required: true },
    fiscalYear: { type: String, required: true },
    allocatedAmount: { type: Number, required: true },
    spentAmount: { type: Number, required: true },
    remainingAmount: { type: Number, default: function() { return this.allocatedAmount - this.spentAmount; } },
    description: { type: String ,required:true},
    createdBy: { type: Number ,required:true},
    createdAt: { type: String ,required:true},
    updatedAt: { type: String ,required:true},
});

module.exports = mongoose.model("budgetSchema",budgetSchema)

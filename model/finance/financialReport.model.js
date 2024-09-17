const mongoose = require('../../config/DB/index');

const {Schema} = mongoose;

const financialReportSchema = new Schema({
    reportType: { type: String, enum: ['Income Statement', 'Balance Sheet', 'Custom'], required: true },
    data: Schema.Types.Mixed, // Use mixed type for custom or complex data structures
    generatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FinancialReport', financialReportSchema);
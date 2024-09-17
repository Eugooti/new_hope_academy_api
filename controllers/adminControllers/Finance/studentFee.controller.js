const {StudentFee} = require('../../../model/finance/feeStructure.model')
const {financeMethods} = require("../../../middleware/financeMiddleware");

module.exports = financeMethods(StudentFee)
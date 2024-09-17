const {FeeItems} = require('../../../model/finance/feeStructure.model')
const {financeMethods} = require("../../../middleware/financeMiddleware");

module.exports = financeMethods(FeeItems)

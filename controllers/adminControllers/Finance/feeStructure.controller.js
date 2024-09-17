const {financeMethods} = require("../../../middleware/financeMiddleware");
const {FeeStructure} = require("../../../model/finance/feeStructure.model");

module.exports = financeMethods(FeeStructure);
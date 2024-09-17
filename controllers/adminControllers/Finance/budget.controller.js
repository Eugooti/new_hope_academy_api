const model = require("../../../model/finance/budget.model");
const {financeMethods} = require("../../../middleware/financeMiddleware");

module.exports = financeMethods(model)
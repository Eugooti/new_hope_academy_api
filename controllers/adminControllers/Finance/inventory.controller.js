const model = require("../../../model/finance/inventory.model");
const {financeMethods} = require("../../../middleware/financeMiddleware");

module.exports = financeMethods(model)
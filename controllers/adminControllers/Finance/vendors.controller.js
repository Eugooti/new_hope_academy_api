const model = require("../../../model/finance/vendors.model");
const {financeMethods} = require("../../../middleware/financeMiddleware");

module.exports = financeMethods(model)
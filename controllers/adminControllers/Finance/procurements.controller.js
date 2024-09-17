const model = require('../../../model/finance/procurementOrders.model');
const {financeMethods} = require("../../../middleware/financeMiddleware");

module.exports = financeMethods(model)
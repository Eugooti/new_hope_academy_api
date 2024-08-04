const {FeeItems} = require('../../../model/finance/feeStructure.model')
const {crudMethods} = require('../../../middleware/CRUDmiddleware/index')

module.exports = crudMethods(FeeItems)

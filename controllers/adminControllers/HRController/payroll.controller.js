const model = require('../../../model/human_resource_management/payroll.model')
const {crudMethods} = require('../../../middleware/CRUDmiddleware/index')

module.exports = crudMethods(model)

const model = require('../../../model/human_resource_management/vaccancies.model')
const {crudMethods} = require("../../../middleware/CRUDmiddleware");

module.exports = crudMethods(model)

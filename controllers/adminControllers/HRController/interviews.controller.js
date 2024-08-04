const model = require('../../../model/human_resource_management/Interviews.model')
const {crudMethods} = require("../../../middleware/CRUDmiddleware/index");

module.exports = crudMethods(model)

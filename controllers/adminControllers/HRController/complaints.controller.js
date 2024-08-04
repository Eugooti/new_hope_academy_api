const model = require('../../../model/human_resource_management/complaints.model')
const {crudMethods} = require("../../../middleware/CRUDmiddleware/index");

module.exports = crudMethods(model)

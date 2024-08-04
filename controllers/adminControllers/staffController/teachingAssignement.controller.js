const model = require('../../../model/roles/teachingAssignments.model')
const {crudMethods} = require("../../../middleware/CRUDmiddleware");

module.exports = crudMethods(model)

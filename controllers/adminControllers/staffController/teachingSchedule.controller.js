const model = require('../../../model/roles/teachingSchedule.model')
const {crudMethods} = require("../../../middleware/CRUDmiddleware");

module.exports = crudMethods(model)

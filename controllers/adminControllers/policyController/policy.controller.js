const model = require('../../../model/Policy/policies.model')
const {crudMethods} = require("../../../middleware/CRUDmiddleware");

module.exports = crudMethods(model)

const model = require('../../../model/Support/MaintainanceRequest.model')
const {crudMethods} = require("../../../middleware/CRUDmiddleware");

module.exports = crudMethods(model)

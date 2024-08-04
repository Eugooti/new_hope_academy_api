const model = require('../../../model/LearnerService/counselingAppointment.model')
const {crudMethods} = require("../../../middleware/CRUDmiddleware");

module.exports = crudMethods(model)

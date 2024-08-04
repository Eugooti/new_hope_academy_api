const model = require('../../../model/classroom/classroomTimetable.model')
const {crudMethods} = require("../../../middleware/CRUDmiddleware");

module.exports = crudMethods(model)

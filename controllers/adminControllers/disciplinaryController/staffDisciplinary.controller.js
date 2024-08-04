const model = require('../../../model/Disciplinary/teachersDisciplinaryData.model')
const {disciplinaryMethods} = require("../../../middleware/Disciplinary/index");

module.exports = disciplinaryMethods(model)

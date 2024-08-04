const model = require('../../../model/Disciplinary/LearnerDisciplinaryData.model')
const {disciplinaryMethods} = require("../../../middleware/Disciplinary/index");

module.exports = disciplinaryMethods(model)

const model = require('../../../model/assessment/assessment2')
const {assessmentMethods} = require("../../../middleware/assessment");

module.exports = assessmentMethods(model)
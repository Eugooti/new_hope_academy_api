const model = require('../../../model/LearnerService/counseling.model')
const {learnerServiceMethods} = require("../../../middleware/learnerService");

module.exports = learnerServiceMethods(model)

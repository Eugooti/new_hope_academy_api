const model = require('../../../model/LearnerService/Medical.model')
const {learnerServiceMethods} = require("../../../middleware/learnerService");

module.exports = learnerServiceMethods(model)
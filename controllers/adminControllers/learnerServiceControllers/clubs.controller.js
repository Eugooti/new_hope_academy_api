const model = require('../../../model/LearnerService/clubs.model')
const {learnerServiceMethods} = require("../../../middleware/learnerService");

module.exports = learnerServiceMethods(model)
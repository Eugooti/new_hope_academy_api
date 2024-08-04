const {learnersMethods} = require('../../../middleware/learnersMinddleware')
const model = require('../../../model/Learners/Learners.model')

module.exports = learnersMethods(model)

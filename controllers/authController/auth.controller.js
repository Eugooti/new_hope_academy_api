const model = require('../../model/Staff/staff.model')
const {authMethods} = require('../../middleware/auth/index')

module.exports = authMethods(model);

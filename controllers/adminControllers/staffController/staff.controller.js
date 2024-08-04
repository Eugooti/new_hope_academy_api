const model = require('../../../model/Staff/staff.model')
const {staffMethods} = require("../../../middleware/StaffMiddleware");

module.exports = staffMethods(model)

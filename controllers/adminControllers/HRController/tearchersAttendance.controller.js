const model = require('../../../model/human_resource_management/staffAttendance.model')
const {attendanceMethod} = require("../../../middleware/Attendance");

module.exports = attendanceMethod(model)

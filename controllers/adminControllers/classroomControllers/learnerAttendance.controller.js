const model = require('../../../model/classroom/classroomAttendance.model')
const {attendanceMethod} = require('../../../middleware/Attendance')

module.exports = attendanceMethod(model)

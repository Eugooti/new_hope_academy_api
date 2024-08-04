const model = require('../../../model/classroom/classroom.model')
const {classRoomMethods} = require('../../../middleware/Classroom_Middleware')

module.exports = classRoomMethods(model)

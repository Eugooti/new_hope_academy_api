const ClassroomAttendance = require('../../model/classroom/classroomAttendance.model');
const {itemNotFound} = require("../../handlers/errorHandlers");
const {formatDate} = require("../../utils/formatDate");

const markAttendance = async (req, res) => {
    const {  admNo, present, markedBy } = req.body;
    const {classroom} = req.params

    try {
        // Find the classroom
        const classroomRecord = await ClassroomAttendance.findOne({ classroom });

        if (!classroomRecord) {
            return itemNotFound(res,"Classroom")
        }

        // Find the learner
        const learner = classroomRecord.attendanceRecord.find(learner => learner.admNo === admNo);

        if (!learner) {
            return res.status(404).json({
                success: false,
                message: 'Learner not found',
            });
        }

        // Update the attendance record
        learner.attendanceRecord.push({
            present,
            date: formatDate(),
            markedBy,
        });

        // Save the updated classroom record
        await classroomRecord.save();

        return res.status(200).json({
            success: true,
            result: classroomRecord,
            message: 'Attendance marked successfully',
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                result: null,
                message: 'Required fields are not supplied',
                error: error,
            });
        } else {
            return res.status(500).json({
                success: false,
                result: null,
                message: error.message,
                error: error,
            });
        }
    }
};

module.exports = { markAttendance };

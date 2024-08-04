const { handleErrors, itemNotFound} = require("../../handlers/errorHandlers");
const {formatDate} = require("../../utils/formatDate");

/**
 * Marks attendance for a learner in a specific classroom.
 *
 * @param {Object} model - The mongoose model for the classroom attendance.
 * @param {Object} req - The request object, containing classroomNo and admNo.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns a response indicating the result of the operation.
 */
const markAttendance = async (model, req, res) => {
    try {
        const  classroomNo  = req.params.id;
        const { present, markedBy, admNo } = req.body;
        const date = formatDate()

        // Find the classroom by classroomNo
        const classroom = await model.findOne({ classroomNo });

        if (!classroom) {
            return itemNotFound(res,"Classroom")
        }

        // Find the learner within the classroom's attendanceRecord by admNo
        const learner = classroom.attendanceRecord.find(record => record.admNo === Number(admNo));

        if (!learner) {
            return itemNotFound(res,"learner")
        }

        // Check if the attendance for today already exists
        const attendanceIndex = learner.attendanceRecord.findIndex(record => record.date === date);

        if (attendanceIndex > -1) {
            // Update the existing attendance record
            learner.attendanceRecord[attendanceIndex].present = present;
            learner.attendanceRecord[attendanceIndex].markedBy = markedBy;
        } else {
            // Add a new attendance record
            learner.attendanceRecord.push({
                present,
                date,
                markedBy
            });
        }

        // Mark the document array as modified
        classroom.markModified('attendanceRecord');

        // Save the updated classroom document
        const updatedClassroom = await classroom.save();

        return res.status(200).json({
            success: true,
            message: 'Attendance marked successfully',
            result: updatedClassroom,
        });

    } catch (error) {
        return handleErrors(res, error);
    }
};

module.exports = { markAttendance };

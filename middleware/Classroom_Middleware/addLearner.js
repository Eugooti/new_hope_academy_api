const { handleErrors, itemNotFound} = require("../../handlers/errorHandlers");

const addLearner = async (model, req, res) => {
    try {
        const { admNo, gender, name } = req.body;
        const classroomNo = req.params.id;

        // Find the classroom by classroomNo
        const result = await model.findOne({ classroomNo });

        if (!result) {
            return itemNotFound(res,"Classroom")
        }

        const learnerList = result.learners

        // Check if the learner already exists in the classroom
        const findLearner = learnerList.some(learner => String(learner.admNo) === String(admNo));


        if (findLearner) {
            return res.status(200).json({
                success: true,
                message: "Learner already added."
            });
        }

        // Add the learner to the learner's array
        result.learners.push(req.body);
        result.markModified('learners');

        // Update the population count
        if (gender === "Male") {
            result.population.male += 1;
        } else if (gender === "Female") {
            result.population.female += 1;
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid gender value"
            });
        }

        result.population.total += 1;

        // Save the updated classroom document
        const updatedClassroom = await result.save();

        return res.status(200).json({
            success: true,
            message: 'Learner added successfully',
            result: updatedClassroom,
        });
    } catch (error) {
        return handleErrors(res, error);
    }
};

const addLearnerToAttendance = async (model,req, res) => {
    try {
        const { admNo } = req.body;

        const classroomNo = req.params.id;

        console.log(classroomNo)

        // Find the classroom by classroomNo
        const result = await model.findOne({ classroomNo });

        if (!result) {
            return itemNotFound(res,"Classroom")
        }

        const findLearner = result.learners.some(learner => String(learner.admNo) === String(admNo));
        if (findLearner) {
            return res.status(200).json({
                success: true,
                message: "Learner already added."
            });
        }

        result.learners.push(req.body);
        result.markModified('attendanceRecord');

        await result.save()

        return res.status(200).json({
            success: true,
            message: 'Learner added successfully',
            result: result,
        });



    }catch (error) {
        console.log(error)
        return handleErrors(res, error);
    }
}

module.exports = { addLearner,addLearnerToAttendance };

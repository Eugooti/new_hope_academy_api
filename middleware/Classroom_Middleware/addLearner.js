const { handleErrors, itemNotFound} = require("../../handlers/errorHandlers");

const addLearner = async (model, req, res) => {
    try {
        const { admNo, gender } = req.body;
        const classroomNo = req.params.id;

        // Find the classroom by classroomNo
        const result = await model.findOne({ classroomNo });

        if (!result) {
            return itemNotFound(res,"Classroom")
        }

        // Check if the learner already exists in the classroom
        const findLearner = result.learners.some(learner => learner.admNo === admNo);

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

module.exports = { addLearner };

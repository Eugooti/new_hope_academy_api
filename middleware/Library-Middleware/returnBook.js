const { handleErrors, itemNotFound } = require("../../handlers/errorHandlers");

const returnBook = async (model, req, res) => {
    try {
        const { id, returnHandler, lateReturnPenalty, cleared } = req.body;
        const borrowerId = req.params.id;

        // Find the borrower record by borrowerId
        const result = await model.findOne({ borrowerId });

        if (!result) {
            return itemNotFound(res, "Borrower record");
        }

        // Find the specific borrow record by id
        const record = result.record.find(item => item._id.toString() === id);

        if (!record) {
            return itemNotFound(res, "Borrow record");
        }

        // Update the borrow record
        record.status = true;
        record.returnHandler = returnHandler;
        record.lateReturnPenalty = lateReturnPenalty;
        record.cleared = cleared;

        result.markModified("record");

        // Save the updated borrower record
        const updatedResult = await result.save();

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Record updated successfully",
            result: updatedResult
        });

    } catch (error) {
        // Handle errors using the handleErrors function
        return handleErrors(res, error);
    }
}

module.exports = { returnBook };

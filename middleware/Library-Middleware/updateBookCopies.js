const IdGenerator = require('../../utils/idGenerator');
const { handleErrors, itemNotFound} = require('../../handlers/errorHandlers');

/**
 * Updates a book record by adding new copies.
 * @param {Object} model - Mongoose model for the book collection.
 * @param req
 * @param res
 * @returns {Promise} - A promise that resolves with the update result or rejects with an error.
 */
const updateBookCopies = async (model, req, res) => {
    try {

        const ISBN = req.params.id
        const {newCopies,category, subCategory, subject} = req.body

        const idGenerator = new IdGenerator();

        const bookIdentifiers = idGenerator.generateBookIdentifiers(newCopies,category,subCategory,subject);

        const result = await model.findOneAndUpdate(
            { ISBN },
            {
                $push: { booksId: { $each: bookIdentifiers } },
                $inc: { totalCopies: newCopies, availableCopies: newCopies }
            },
            { new: true }
        ).exec();

        if (!result) {
            return itemNotFound(res,"Book")
        }

        return res.status(200).json({
            success:true,
            message:"Updated successfully"
        })

    } catch (error) {
        return handleErrors(res,error)
    }
};

module.exports = { updateBookCopies };

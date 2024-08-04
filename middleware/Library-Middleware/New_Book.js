const {handleErrors} = require('../../handlers/errorHandlers')
const GenerateId = require('../../utils/idGenerator')

/**
 * Creates a new book document and generates unique identifiers for each copy.
 *
 * @param {Object} model - Mongoose model for the book collection.
 * @param {Object} req - Express request object containing book details in `req.body`.
 * @param {Object} res - Express response object used to send the response.
 * @returns {Object} - Response object with status and message.
 */

const createBook = async (model,req, res) => {
    try {
        const { title, authors, category,subCategory,subject, publishers, ISBN, publicationDate, totalCopies, recordedBy } = req.body;
        const count = totalCopies;
        const generate = new GenerateId()
        const bookIdentifiers = generate.generateBookIdentifiers(count, category, subCategory, subject); // Use actual category, subCategory, and subject

        const result = new model({
            title,
            authors,
            category,
            publishers,
            ISBN,
            publicationDate,
            totalCopies,
            availableCopies: totalCopies, // Initially all are available
            booksId: bookIdentifiers,
            recordedBy
        }).save();

        // Return the generated identifiers to the user
        return res.status(200).json({
            success: true,
            message: 'Book created successfully.',
            result
        });

    } catch (error) {
        return handleErrors(res,error)
    }
};

module.exports = { createBook };

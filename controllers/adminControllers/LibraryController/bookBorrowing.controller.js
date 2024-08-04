const model = require('../../../model/Library/BooksBorrowingRecord.model')
const {libraryMethods} = require("../../../middleware/Library-Middleware");

module.exports = libraryMethods(model)

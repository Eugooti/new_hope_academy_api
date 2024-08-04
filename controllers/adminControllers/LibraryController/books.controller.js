const model = require('../../../model/Library/Books.model')
const {libraryMethods} = require("../../../middleware/Library-Middleware");

module.exports = libraryMethods(model)

const model = require('../../../model/events/ImportantDates.model')
const {eventsMethods} = require("../../../middleware/events");

module.exports = eventsMethods(model)

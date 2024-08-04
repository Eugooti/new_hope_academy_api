const model = require('../../../model/events/reminders.model')
const {eventsMethods} = require("../../../middleware/events");

module.exports = eventsMethods(model)

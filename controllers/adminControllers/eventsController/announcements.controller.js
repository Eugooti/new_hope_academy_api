const model = require('../../../model/events/announcements.model')
const {eventsMethods} = require("../../../middleware/events");


module.exports = eventsMethods(model)

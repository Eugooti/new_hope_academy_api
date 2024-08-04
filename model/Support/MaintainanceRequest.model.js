const mongoose = require('../../config/DB/index');
const {formatDate} = require("../../utils/formatDate");


const maintenanceRequestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'pending' },
    priority: { type: String, required: true },
    submitter: { type: String, required: true },
    assignedTo: { type: String },
    createdDate: { type: String, default: formatDate,required:true },
    completedDate: { type: String }
});

module.exports = mongoose.model("maintenanceRequest",maintenanceRequestSchema)

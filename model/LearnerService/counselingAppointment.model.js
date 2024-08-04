const mongoose = require('../../config/DB/index');

const counselingAppointmentSchema = new mongoose.Schema({
    student: { type: Number, required: true },
    counselor: { type: Number, required: true },
    appointmentDate: { type: Date, required: true },
    status: { type: String, default: 'scheduled' },
    notes: { type: String }
});

module.exports = mongoose.model("counselingAppointmentSchema",counselingAppointmentSchema)
/**
 * Counseling Appointment Schema
 * Description: This schema will manage counseling appointments for students.
 * Attributes:
 * student (AdmNo) - Reference to the student who booked the appointment.
 * counselor (StaffId) - Reference to the counselor assigned.
 * appointmentDate (Date) - The date and time of the appointment.
 * status (String) - The status of the appointment (e.g., scheduled, completed, canceled).
 * notes (String) - Any additional notes or comments.
 * **/

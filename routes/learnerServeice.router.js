const express = require('express');

const counsellingSessionController = require('../controllers/adminControllers/learnerServiceControllers/counseling.controller')
const counsellingAppointmentsController = require('../controllers/adminControllers/learnerServiceControllers/counselingAppointment.controller')
const clinicController = require('../controllers/adminControllers/learnerServiceControllers/clinic.controller')
const clubController = require('../controllers/adminControllers/learnerServiceControllers/clubs.controller')
const {catchErrors, validateLearnerId, validateObjectId} = require("../handlers/errorHandlers");

const router = express.Router()


//----------------------------------------learner service-------------------------------------------------
router.route('/learnerService/counseling/session/create').post(catchErrors(counsellingSessionController.create))
router.route('/learnerService/counseling/session/read').get(catchErrors(counsellingSessionController.readAll))
router.route('/learnerService/counseling/session/addRecord/:id').put(validateLearnerId,catchErrors(counsellingSessionController.counselingSession))
router.route('/learnerService/counseling/session/read/:id').get(validateLearnerId,catchErrors(counsellingSessionController.readDataByLearnerAdmissionNumber))
router.route('/learnerService/counseling/session/delete/:id').put(validateLearnerId,catchErrors(counsellingSessionController.removeByLearnerAdmNo))

router.route('/learnerService/counseling/appointments/create').post(catchErrors(counsellingAppointmentsController.create))
router.route('/learnerService/counseling/session/read').get(catchErrors(counsellingAppointmentsController.readAll))
router.route('/learnerService/counseling/session/readOne/:/id').get(validateLearnerId,catchErrors(counsellingAppointmentsController.readDataByLearnerAdmissionNumber))
router.route('/learnerService/counseling/session/delete/:/id').delete(validateObjectId,catchErrors(counsellingSessionController.remove))

router.route('/learnerService/clinic/create').post(catchErrors(clinicController.create))
router.route('/learnerService/clinic/read').get(catchErrors(clinicController.readAll))
router.route('/learnerService/clinic/readOne/:id').get(validateLearnerId,catchErrors(clinicController.readDataByLearnerAdmissionNumber))
router.route('/learnerService/clinic/addRecord/:id').put(validateLearnerId,catchErrors(clinicController.addClinicRecord))
router.route('/learnerService/clinic/update/:id').put(validateLearnerId,catchErrors(clinicController.update))
router.route('/learnerService/clinic/delete/:id').put(validateLearnerId,catchErrors(clinicController.remove))

router.route('/learnerService/club/create').post(catchErrors(clubController.create))
router.route('/learnerService/club/read').get(catchErrors(clubController.readAll))
router.route('/learnerService/club/readOne/:id').get(validateObjectId,catchErrors(clubController.readDataByLearnerAdmissionNumber))
router.route('/learnerService/club/addLearner/:id').put(validateLearnerId,catchErrors(clubController.addLearnerToClub))
router.route('/learnerService/club/update/:id').put(validateObjectId,catchErrors(clubController.update))
router.route('/learnerService/club/delete/:id').put(validateObjectId,catchErrors(clubController.remove))

module.exports = router
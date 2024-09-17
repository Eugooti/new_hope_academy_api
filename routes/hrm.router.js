const express = require('express');

const vacanciesController = require('../controllers/adminControllers/HRController/vaccancies.controller')
const complaintsController = require('../controllers/adminControllers/HRController/complaints.controller')
const interviewsController= require('../controllers/adminControllers/HRController/interviews.controller')
const payrollController= require('../controllers/adminControllers/HRController/payroll.controller')
const staffAttendanceController = require('../controllers/adminControllers/HRController/tearchersAttendance.controller')
const {catchErrors, validateObjectId, validateStaffId} = require("../handlers/errorHandlers");


const router = express.Router();

//------------------------------------human resource management routes----------------------------------


router.route('/hr/vacancy/create').post(catchErrors(vacanciesController.create))
router.route('/hr/vacancy/readAll').get(catchErrors(vacanciesController.readAll))
router.route('/hr/vacancy/readOne/:id').get(validateObjectId,catchErrors(vacanciesController.readById))
router.route('/hr/vacancy/update/:id').put(validateObjectId,catchErrors(vacanciesController.update))
router.route('/hr/vacancy/delete/:id').delete(validateObjectId,catchErrors(vacanciesController.remove))
router.route('/hr/complaints/create').post(catchErrors(complaintsController.create))
router.route('/hr/complaints/readAll').get(catchErrors(complaintsController.readAll))
router.route('/hr/complaints/readOne/:id').get(validateObjectId,catchErrors(complaintsController.readById))
router.route('/hr/complaints/update/:id').put(validateObjectId,catchErrors(complaintsController.update))
router.route('/hr/complaints/delete/:id').delete(validateObjectId,catchErrors(complaintsController.create))
router.route('/hr/interviews/create').post(catchErrors(interviewsController.create))
router.route('/hr/interviews/readAll').get(catchErrors(interviewsController.readAll))
router.route('/hr/interviews/readOne/:id').get(validateObjectId,catchErrors(interviewsController.readById))
router.route('/hr/interviews/update/:id').put(validateObjectId,catchErrors(interviewsController.update))
router.route('/hr/interviews/delete/:id').delete(validateObjectId,catchErrors(interviewsController.create))
router.route('/hr/payroll/create').post(catchErrors(payrollController.create))
router.route('/hr/payroll/readAll').get(catchErrors(payrollController.readAll))
router.route('/hr/payroll/readOne/:id').get(validateObjectId,catchErrors(payrollController.readById))
router.route('/hr/payroll/update/:id').put(validateObjectId,catchErrors(payrollController.update))
router.route('/hr/payroll/delete/:id').delete(validateObjectId,catchErrors(payrollController.create))
router.route('/hr/staffAttendance/create').post(catchErrors(staffAttendanceController.create))
router.route('/hr/staffAttendance/read').get(catchErrors(staffAttendanceController.readAll))
router.route('/hr/staffAttendance/readOne/:id').get(validateStaffId,catchErrors(staffAttendanceController.readDataByStaffEmployeeNumber))
router.route('/hr/staffAttendance/mark/:id').put(validateStaffId,catchErrors(staffAttendanceController.staffAttendance))
router.route('/hr/staffAttendance/update/:id').put(validateStaffId,catchErrors(staffAttendanceController.update))
router.route('/hr/staffAttendance/delete/:id').put(validateStaffId,catchErrors(staffAttendanceController.remove))


module.exports = router
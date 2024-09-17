const express = require('express')
const {catchErrors,validateLearnerId, validateStaffId, validateObjectId} = require('../handlers/errorHandlers')
const {validateAndSanitize} = require('../handlers/Data-Validation')

const learnerController =require('../controllers/adminControllers/learnerController/learner.controller')
const staffController = require('../controllers/adminControllers/staffController/staff.controller')
const staffScheduleController = require('../controllers/adminControllers/staffController/staff.controller')
const libraryController = require('../controllers/adminControllers/LibraryController/books.controller')
const libraryBookBorrowingController = require('../controllers/adminControllers/LibraryController/bookBorrowing.controller')
const supportController = require('../controllers/adminControllers/support/support.controller')
const announcementController = require('../controllers/adminControllers/eventsController/announcements.controller')
const importantDatesController = require('../controllers/adminControllers/eventsController/importantDates.controller')
const reminderController = require('../controllers/adminControllers/eventsController/reminders.controller')
const departmentController = require('../controllers/adminControllers/departmentController/departments.controller')
const {checkPrivilege} = require("../config/security/accessControll");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Learners
 *   description: Operations related to learners
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Parent:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - relationship
 *         - idNo
 *         - phone
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         relationship:
 *           type: string
 *         idNo:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *     Learner:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - gender
 *         - classroom
 *         - yob
 *         - disability
 *         - medicalCondition
 *         - address
 *         - admittedBy
 *         - AdmittedAT
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         gender:
 *           type: string
 *         classroom:
 *           type: number
 *         yob:
 *           type: string
 *         disability:
 *           type: string
 *         medicalCondition:
 *           type: string
 *         address:
 *           type: string
 *         UPINo:
 *           type: string
 *         birthCertificateNo:
 *           type: string
 *         parents:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Parent'
 *         admittedBy:
 *           type: number
 *         AdmittedAT:
 *           type: string
 */

/**
 * @swagger
 * /learner/create:
 *   post:
 *     summary: Create a new learner
 *     tags: [Learners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Learner'
 *     responses:
 *       201:
 *         description: Learner created successfully
 *       400:
 *         description: Invalid input
 */
router.route('/learner/create').post( validateAndSanitize("learner"), catchErrors(learnerController.admitLearner));


/**
 * @swagger
 * /learners/read:
 *   get:
 *     summary: Retrieve all learners
 *     tags: [Learners]
 *     responses:
 *       200:
 *         description: List of learners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Learner'
 *       404:
 *         description: Learners not found
 */
router.route('/learners/read').get(catchErrors(learnerController.readAll))

/**
 * @swagger
 * /learners/readOne/{id}:
 *   get:
 *     summary: Retrieve a single learner by ID
 *     tags: [Learners]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The learner ID
 *     responses:
 *       200:
 *         description: A single learner
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Learner'
 *       404:
 *         description: Learner not found
 */
router.route('/learners/readOne/:id').get(validateLearnerId,catchErrors(learnerController.readDataByLearnerAdmissionNumber))

/**
 * @swagger
 * /learners/update/{id}:
 *   put:
 *     summary: Update a learner by ID
 *     tags: [Learners]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The learner ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Learner'
 *     responses:
 *       200:
 *         description: Learner updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Learner not found
 */
router.route('/learners/update/:id').put(validateLearnerId,catchErrors(learnerController.updateByLearner))

/**
 * @swagger
 * /learners/delete/{id}:
 *   delete:
 *     summary: Delete a learner by ID
 *     tags: [Learners]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The learner ID
 *     responses:
 *       200:
 *         description: Learner deleted successfully
 *       404:
 *         description: Learner not found
 */
router.route('/learners/delete/:id').delete(validateLearnerId,catchErrors(learnerController.removeByLearnerAdmNo))


/**
 * @swagger
 * tags:
 *  name: Staff
 *  description: Operations related to staff
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       required:
 *         - employeeNo
 *         - firstname
 *         - lastName
 *         - idNumber
 *         - gender
 *         - email
 *         - address
 *         - phone
 *         - qualifications
 *         - createdBy
 *       properties:
 *         employeeNo:
 *           type: number
 *           example: 1001
 *         firstname:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         idNumber:
 *           type: string
 *           example: 1234567890
 *         gender:
 *           type: string
 *           example: Male
 *         email:
 *           type: string
 *           example: john.doe@example.com
 *         address:
 *           type: string
 *           example: 123 Elm Street
 *         phone:
 *           type: string
 *           example: 123-456-7890
 *         qualifications:
 *           type: string
 *           example: Bachelor's Degree in Computer Science
 *         password:
 *           type: string
 *           example: [auto-generated]
 *         salt:
 *           type: string
 *           example: [auto-generated]
 *         createdBy:
 *           type: number
 *           example: 1
 *         registeredAT:
 *           type: string
 *           example: 2024-08-02T12:34:56Z
 *       example:
 *         employeeNo: 1001
 *         firstname: John
 *         lastName: Doe
 *         idNumber: 1234567890
 *         gender: Male
 *         email: john.doe@example.com
 *         address: 123 Elm Street
 *         phone: 123-456-7890
 *         qualifications: Bachelor's Degree in Computer Science
 *         bankAccount: 1234567890
 *         salary: 50000
 *         password: [auto-generated]
 *         salt: [auto-generated]
 *         createdBy: 1
 *         registeredAT: 2024-08-02T12:34:56Z
 */

/**
 * @swagger
 * /staff/create:
 *   post:
 *     summary: Create a new staff member
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Staff'
 *     responses:
 *       200:
 *         description: Staff member created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unable to create user
 */
router.route('/staff/create').post(checkPrivilege(['manage_school']),catchErrors(staffController.createEmployee))

/**
 * @swagger
 * /staff/read:
 *   get:
 *     summary: Retrieve all staff members
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: List of staff members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 *       404:
 *         description: Staff members not found
 */
router.route('/staff/read').get(catchErrors(staffController.readAll))

/**
 * @swagger
 * /staff/readOne/{id}:
 *   get:
 *     summary: Retrieve a staff member by employee number
 *     tags: [Staff]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The staff member's employee number
 *     responses:
 *       200:
 *         description: Staff member data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       404:
 *         description: Staff member not found
 */
router.route('/staff/readOne/:id').get(validateStaffId,catchErrors(staffController.readDataByStaffEmployeeNumber))

/**
 * @swagger
 * /staff/update/{id}:
 *   put:
 *     summary: Update a staff member by employee number
 *     tags: [Staff]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The staff member's employee number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Staff'
 *     responses:
 *       200:
 *         description: Staff member updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Staff member not found
 */
router.route('/staff/update/:id').put(validateStaffId,catchErrors(staffController.updateByStaff))

/**
 * @swagger
 * /staff/delete/{id}:
 *   delete:
 *     summary: Delete a staff member by employee number
 *     tags: [Staff]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The staff member's employee number
 *     responses:
 *       200:
 *         description: Staff member deleted successfully
 *       404:
 *         description: Staff member not found
 */
router.route('/staff/delete/:id').delete(validateStaffId,catchErrors(staffController.removeByStaffId))


/**
 * @swagger
 * tags:
 *  name: StaffSchedules
 *  description: Staff schedules operations involving time of a lesson.
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      lesson:
 *        type: object
 *        required:
 *          - subject
 *          - classroom
 *          - time
 *        properties:
 *          subject:
 *            type: string
 *          classroom:
 *            type: number
 *          time:
 *            type: string
 *      daySchedule:
 *        type: object
 *        required:
 *          - day
 *          - lesson
 *        properties:
 *          day:
 *            type: number
 *          lessons:
 *            type: array
 *            items:
 *              $ref: '#components/schemas/lesson'
 *      teachersSchedule:
 *        type: object
 *        required:
 *          - employeeNo
 *          - weekSchedule
 *        properties:
 *          employeeNo:
 *            type: number
 *          weekSchedule:
 *            type: array
 *            items:
 *               $ref: '#components/schemas/daySchedule'
 */

/**
 * @swagger
 * /staff/schedule/create:
 *   post:
 *     summary: Create a schedule
 *     tags: [StaffSchedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/teachersSchedule'
 *     responses:
 *       200:
 *         description: Schedule created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route('/staff/schedule/create').post(catchErrors(staffScheduleController.create))

/**
 * @swagger
 * /staff/schedule/readOne/{id}:
 *   get:
 *     summary: Retrieve a staff schedule
 *     tags: [StaffSchedules]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: the employee number
 *     responses:
 *       200:
 *         description: staff schedule
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/teachersSchedule'
 *       404:
 *         description: Record not found
 *       500:
 *         description: server error
 */
router.route('/staff/schedule/readOne/:id').get(validateStaffId,catchErrors(staffScheduleController.readDataByStaffEmployeeNumber))

/**
 * @swagger
 * /staff/schedule/update/{id}:
 *   put:
 *     summary: Update a learner schedule
 *     tags: [StaffSchedules]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The staff employee number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/teachersSchedule'
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Record not found
 *       500:
 *         description: Server error
 */
router.route('/staff/schedule/update/:id').get(validateStaffId,catchErrors(staffScheduleController.updateByStaff))

/**
 * @swagger
 * /staff/schedule/delete/{id}:
 *   delete:
 *     summary: Delete staff schedule
 *     tags: [StaffSchedules]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The staff member's employee number
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *       404:
 *         description: Record not found
 *       500:
 *         description: server error
 */

router.route('/staff/schedule/delete/:id').get(validateStaffId,catchErrors(staffScheduleController.removeByStaffId))


/**
 * @swagger
 * tags:
 *      name: Library
 *      description: Operations on library activities.
 */
router.route('/library/addBook').post(catchErrors(libraryController.createBook))
router.route('/library/read').get(catchErrors(libraryController.readAll))
router.route('/library/readOne/:id').get(validateObjectId,catchErrors(libraryController.readById))
router.route('/library/updateBookCopies/:id').put(catchErrors(libraryController.updateBookCopies))
router.route('/library/update/:id').put(catchErrors(libraryController.remove))
router.route('/library/borrowBook/:id').put(catchErrors(libraryBookBorrowingController.bookBorrowing))
router.route('/library/returnBook/:id').put(catchErrors(libraryBookBorrowingController.returnBook))


//--------------------------------------------support------------------------------------------------
router.route('/support/create').post(catchErrors(supportController.create))
router.route('/support/read').get(catchErrors(supportController.readAll))
router.route('/support/update/:id').put(validateObjectId,catchErrors(supportController.update))
router.route('/support/delete/:id').delete(validateObjectId,catchErrors(supportController.remove))





//-----------------------------------events controller-------------------------------------------------
router.route('/events/announcements/create').post(catchErrors(announcementController.create))
router.route('/events/announcements/read').get(catchErrors(announcementController.readAll))
router.route('/events/announcements/readOne/:id').get(catchErrors(announcementController.readById))
router.route('/events/announcements/update/:id').put(validateObjectId,catchErrors(announcementController.update));
router.route('/events/announcements/delete/:id').delete(validateObjectId,catchErrors(announcementController.remove));

router.route('/events/importantDates/create').post(catchErrors(importantDatesController.create))
router.route('/events/importantDates/read').get(catchErrors(importantDatesController.readAll))
router.route('/events/importantDates/readOne/:id').get(catchErrors(importantDatesController.readById))
router.route('/events/importantDates/update/:id').put(validateObjectId,catchErrors(importantDatesController.update));
router.route('/events/importantDates/delete/:id').delete(validateObjectId,catchErrors(importantDatesController.remove));

router.route('/events/reminder/create').post(catchErrors(reminderController.addTodoItem))
router.route('/events/reminder/read').get(catchErrors(reminderController.readAll))
router.route('/events/reminder/readOne/:id').get(catchErrors(reminderController.readDataByStaffEmployeeNumber))
router.route('/events/reminder/delete/:id').delete(validateObjectId,catchErrors(reminderController.removeTodoItem));

//------------------------------------------------department controller -----------------------------------
router.route('/department/create').post(catchErrors(departmentController.create))
router.route('/department/read').get(catchErrors(departmentController.readAll))
router.route('/department/update/:id').put(validateObjectId,catchErrors(departmentController.update))
router.route('/department/delete/:id').delete(validateObjectId,catchErrors(departmentController.remove))

module.exports = router;

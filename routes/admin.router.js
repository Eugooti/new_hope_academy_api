const express = require('express')
const {catchErrors,validateLearnerId, validateStaffId, validateObjectId} = require('../handlers/errorHandlers')
const {validateAndSanitize} = require('../handlers/Data-Validation')

const learnerController =require('../controllers/adminControllers/learnerController/learner.controller')
const staffController = require('../controllers/adminControllers/staffController/staff.controller')
const staffScheduleController = require('../controllers/adminControllers/staffController/staff.controller')
const classroomController = require('../controllers/adminControllers/classroomControllers/classroom.controller')
const classroomTimetableController = require('../controllers/adminControllers/classroomControllers/timetable.controller')
const learnerAttendance = require('../controllers/adminControllers/classroomControllers/learnerAttendance.controller')
const libraryController = require('../controllers/adminControllers/LibraryController/books.controller')
const libraryBookBorrowingController = require('../controllers/adminControllers/LibraryController/bookBorrowing.controller')

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
 *         - bankAccount
 *         - salary
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
 *         bankAccount:
 *           type: string
 *           example: 1234567890
 *         salary:
 *           type: string
 *           example: 50000
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
router.route('/staff/create').post(validateAndSanitize("staff"),catchErrors(staffController.createEmployee))

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
 *  name: Classroom
 *  description: Operations on classrooms
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     learners:
 *       type: object
 *       required:
 *         - name
 *         - admNo
 *         - gender
 *       properties:
 *         name:
 *           type: string
 *         admNo:
 *           type: number
 *         gender:
 *           type: string
 *     classroom:
 *       type: object
 *       required:
 *         - classroomNo
 *         - classroomName
 *         - classroomFacilitator
 *         - population
 *         - learners
 *         - createdBy
 *       properties:
 *         classroomNo:
 *           type: number
 *         classroomName:
 *           type: string
 *         classroomFacilitator:
 *           type: string
 *         population:
 *           type: object
 *           required:
 *             - male
 *             - female
 *             - total
 *           properties:
 *             male:
 *               type: number
 *             female:
 *               type: number
 *             total:
 *               type: number
 *         learners:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/learners'
 *         createdBy:
 *           type: number
 */

/**
 * @swagger
 * /classroom/create:
 *   post:
 *     summary: Create a new classroom
 *     tags: [Classroom]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/classroom'
 *     responses:
 *       200:
 *         description: Classroom created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: server error
 */
router.route('/classroom/create').post(validateAndSanitize("classroom"),catchErrors(classroomController.create))

/**
 * @swagger
 * /classroom/read:
 *   get:
 *     summary: Retrieve all classroom record
 *     tags: [Classroom]
 *     responses:
 *       200:
 *         description: List of classroom
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/classroom'
 *       500:
 *         description: server error
 */
router.route('/classroom/read').get(catchErrors(classroomController.readAll))

/**
 * @swagger
 * /classroom/readOne/{id}:
 *   get:
 *     summary: retrieve classroom record
 *     tags: [Classroom]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The classroom number
 *     responses:
 *       200:
 *         description: A single classroom
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/classroom'
 *       404:
 *         description: Classroom not found
 */
router.route('/classroom/readOne/:id').get(catchErrors(classroomController.readByClassroomNo))

/**
 * @swagger
 * /classroom/update/{id}:
 *   put:
 *     summary: Update classroom details
 *     tags: [Classroom]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The classroom number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/classroom'
 *     responses:
 *       200:
 *         description: Classroom updated successfully
 *       400:
 *         description: invalid input
 *       404:
 *         description: classroom not found.
 */
router.route('/classroom/update/:id').put(validateObjectId,catchErrors(classroomController.update))

/**
 * @swagger
 * /classroom/delete/{id}:
 *   delete:
 *     summary: Delete a classroom.
 *     tags: [Classroom]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The classroom id
 *     responses:
 *       200:
 *         description: Classroom deleted successfully.
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Classroom not found
 *       500:
 *         description: server error
 */
router.route('/classroom/delete/:id').delete(validateObjectId,catchErrors(classroomController.remove))

/**
 * @swagger
 * /classroom/addLearner/{id}:
 *   put:
 *     summary: Add a learner to a class
 *     tags: [Classroom]
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: number
 *        description: Classroom number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/learners'
 *     responses:
 *       200:
 *         description: learner added successfully
 *       400:
 *         description: invalid input
 *       404:
 *         description: Classroom not found
 *       500:
 *         description: server error
 */
router.route('/classroom/addLearner/:id').put(validateObjectId,catchErrors(classroomController.addLearner))

/**
 * @swagger
 * components:
 *   schemas:
 *     classLesson:
 *       type: object
 *       required:
 *         - lesson
 *         - time
 *         - moderator
 *       properties:
 *         lesson:
 *           type: string
 *         time:
 *           type: string
 *         moderator:
 *           type: string
 *     classDaySchedule:
 *       type: object
 *       required:
 *         - day
 *         - lessons
 *       properties:
 *         day:
 *           type: number
 *         lessons:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/classLesson'
 *     timetable:
 *       type: object
 *       required:
 *         - classroomNo
 *         - classroomName
 *         - schedule
 *       properties:
 *         classroomNo:
 *           type: number
 *         classroomName:
 *           type: string
 *         schedule:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/classDaySchedule'
 */

/**
 * @swagger
 * /classroom/timetable/create:
 *   post:
 *     summary: Create a class timetable
 *     tags: [Classroom]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/timetable'
 *     responses:
 *       200:
 *         description: Created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route('/classroom/timetable/create').post(catchErrors(classroomTimetableController.create))

/**
 * @swagger
 * /classroom/timetable/readOne/{id}:
 *   get:
 *     summary: Get a class timetable
 *     tags: [Classroom]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: classroom number
 *     responses:
 *       200:
 *         description: record found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/timetable'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Classroom timetable not found
 */
router.route('/classroom/timetable/readOne/:id').get(catchErrors(classroomTimetableController.readByClassroomNo))

/**
 *@swagger
 * /classroom/timetable/update/{id}:
 *   put:
 *     summary: Update the class timetable
 *     tags: [Classroom]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: classroom timetable id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/timetable'
 *     responses:
 *       200:
 *         description: Timetable updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: server error
 *
 */
router.route('/classroom/timetable/update/:id').put(validateObjectId, catchErrors(classroomTimetableController.update))

/**
 * @swagger
 * /classroom/timetable/update/{id}:
 *   delete:
 *     summary: Delete a classroom timetable
 *     tags: [Classroom]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Classroom id
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route('/classroom/timetable/update/:id').delete(validateObjectId,catchErrors(classroomTimetableController.remove))

/**
 * @swagger
 * components:
 *   schemas:
 *     Attendance:
 *       type: object
 *       required:
 *         - present
 *         - date
 *         - markedBy
 *       properties:
 *         present:
 *           type: string
 *         date:
 *           type: string
 *         markedBy:
 *           type: string
 *     learnerAttendance:
 *       type: object
 *       required:
 *         - admNo
 *         - fullName
 *         - attendanceRecord
 *       properties:
 *         admNo:
 *           type: number
 *         fullName:
 *           type: String
 *         attendance:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Attendance'
 *     classAttendance:
 *       type: object
 *       required:
 *         - classroomNo
 *         - classroomFacilitator
 *         - attendanceRecord
 *       properties:
 *         classroomNo:
 *           type: number
 *         classroomFacilitator:
 *           type: string
 *         attendanceRecord:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/learnerAttendance'
 */

/**
 * @swagger
 * /classroom/attendance/create:
 *   post:
 *     summary: Create a classroom attendance record
 *     tags: [Classroom]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/classAttendance'
 *     responses:
 *       200:
 *         description: Record created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route('/classroom/attendance/create').post(catchErrors(learnerAttendance.create))

/**
 * @swagger
 * /classroom/attendance/read:
 *   get:
 *     summary: Read all classroom attendance
 *     tags: [Classroom]
 *     responses:
 *       200:
 *         description: All learner attendance record
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/classAttendance'
 *       500:
 *         description: server error
 *       404:
 *         description: Record not found
 */
router.route('/classroom/attendance/read').get(catchErrors(learnerAttendance.readAll))

/**
 * @swagger
 * /classroom/attendance/readOne/{id}:
 *   get:
 *     summary: Read one classroom record
 *     tags: [Classroom]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The classroom number
 *     responses:
 *       200:
 *         description: A classroom record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/classAttendance'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Classroom not found
 *
 */
router.route('/classroom/attendance/readOne/:id').get(catchErrors(learnerAttendance.readByClassroomNo))

/**
 * @swagger
 * /classroom/attendance/update/{id}:
 *   put:
 *     summary: Update attendance record
 *     tags: [Classroom]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: classroom timetable id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/timetable'
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/timetable'
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Classroom timetable not found.
 *       500:
 *         description: Server error.
 */
router.route('/classroom/attendance/update/:id').put(validateObjectId,catchErrors(learnerAttendance.update))

/**
 * @swagger
 * /classroom/attendance/delete/{id}:
 *   delete:
 *     summary: Remove a class attendance
 *     tags: [Classroom]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Classroom Number
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Classroom not found
 */
router.route('/classroom/attendance/delete/:id').delete(validateObjectId,catchErrors(learnerAttendance.remove))

/**
 * @swagger
 * /classroom/attendance/mark/{id}:
 *   put:
 *     summary: Mark attendance
 *     tags: [Classroom]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Classroom number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admNo:
 *                 type: number
 *               attendance:
 *                 type: object
 *     responses:
 *       200:
 *         description: Updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Record not found
 */
router.route('/classroom/attendance/mark/:id').put(catchErrors(learnerAttendance.markLearnerAttendance))


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


module.exports = router;

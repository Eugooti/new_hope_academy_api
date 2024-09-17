const express = require('express');

const classroomController = require('../controllers/adminControllers/classroomControllers/classroom.controller')
const classroomTimetableController = require('../controllers/adminControllers/classroomControllers/timetable.controller')
const learnerAttendance = require('../controllers/adminControllers/classroomControllers/learnerAttendance.controller')
const {validateAndSanitize} = require("../handlers/Data-Validation");
const {catchErrors, validateObjectId} = require("../handlers/errorHandlers");

const router = express.Router();


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
router.route('/classroom/create').post(catchErrors(classroomController.create))

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

module.exports = router

const { body, validationResult } = require('express-validator');

// Validation and sanitization middleware
const validateAndSanitize = (entity) => {
    let validations = [];

    switch (entity) {
        case 'classroomTimetable':
            validations = [
                body('classroomNo').isInt().withMessage('Classroom number must be an integer').notEmpty().withMessage("Required Field"),
                body('classroomName').isString().trim().notEmpty().withMessage('Classroom name is required'),
                body('schedule').isArray().withMessage('Schedule must be an array'),
                body('schedule.*.day').isInt({ min: 1, max: 7 }).withMessage('Day must be an integer between 1 and 7'),
                body('schedule.*.lessons').isArray().withMessage('Lessons must be an array'),
                body('schedule.*.lessons.*.lesson').isString().trim().notEmpty().withMessage('Lesson name is required'),
                body('schedule.*.lessons.*.time').matches(/^\d{2}:\d{2}$/).withMessage('Time must be in HH:MM format'),
                body('schedule.*.lessons.*.moderator').isString().trim().notEmpty().withMessage('Moderator name is required')
            ];
            break;
        case 'department':
            validations = [
                body('name').isString().trim().notEmpty().withMessage('Department name is required'),
                body('description').isString().withMessage("Description Should be a string").trim().notEmpty().withMessage('Description is required'),
                body('head').isMongoId().withMessage('Head must be a valid user ID')
            ];
            break;
        case 'staff':
            validations = [
                body('firstname').isString().withMessage("Name Field is a String").trim().notEmpty().withMessage('First name is required'),
                body('lastName').isString().withMessage("Name Field is a String").trim().notEmpty().withMessage('Last name is required'),
                body('idNumber').isString().trim().notEmpty().withMessage('ID number is required'),
                body('gender').isString().trim().notEmpty().withMessage('Gender is required'),
                body('email').isEmail().withMessage('Invalid email address').notEmpty().withMessage("Email required"),
                body('address').isString().trim().notEmpty().withMessage('Address is required'),
                body('phone').isString().trim().notEmpty().withMessage('Phone number is required'),
                body('qualifications').isArray().withMessage('Qualifications must be an array'),
                body('qualifications.*').isString().trim().notEmpty().withMessage('Each qualification must be a string'),
                body('bankAccount').isString().trim().notEmpty().withMessage('Bank account is required'),
                body('salary').isString().trim().notEmpty().withMessage('Salary is required'),
                body('createdBy').isInt().withMessage('Created by must be an integer'),
            ];
            break;
        case 'learner':
            validations = [
                body('firstName').isString().trim().notEmpty().withMessage('First name is required'),
                body('lastName').isString().trim().notEmpty().withMessage('Last name is required'),
                body('gender').isString().trim().notEmpty().withMessage('Gender is required'),
                body('classroom').isInt().withMessage('Classroom must be an integer'),
                body('yob').isString().trim().notEmpty().withMessage('Year of birth is required'),
                body('disability').isString().trim().notEmpty().withMessage('Disability is required'),
                body('medicalCondition').isString().trim().notEmpty().withMessage('Medical condition is required'),
                body('address').isString().trim().notEmpty().withMessage('Address is required'),
                body('UPINo').optional().isString().trim(),
                body('birthCertificateNo').optional().isString().trim(),
                body('parents').isArray().withMessage('Parents must be an array'),
                body('parents.*.first_name').isString().trim().notEmpty().withMessage('Parent first name is required'),
                body('parents.*.last_name').isString().trim().notEmpty().withMessage('Parent last name is required'),
                body('parents.*.relationship').isString().trim().notEmpty().withMessage('Parent relationship is required'),
                body('parents.*.idNo').isString().trim().notEmpty().withMessage('Parent ID number is required'),
                body('parents.*.phone').isString().trim().notEmpty().withMessage('Parent phone number is required'),
                body('parents.*.email').optional().isEmail().withMessage('Invalid parent email address'),
                body('admittedBy').isNumeric().withMessage('Admitted by must be an integer'),
            ];
            break;
        case 'maintenanceRequest':
            validations = [
                body('title').isString().trim().notEmpty().withMessage('Title is required'),
                body('description').isString().trim().notEmpty().withMessage('Description is required'),
                body('status').optional().isString().trim(),
                body('priority').isString().trim().notEmpty().withMessage('Priority is required'),
                body('submitter').isString().trim().notEmpty().withMessage('Submitter is required'),
                body('assignedTo').optional().isString().trim(),
                body('createdDate').optional().isISO8601().toDate(),
                body('completedDate').optional().isISO8601().toDate()
            ];
            break;

        case "classroom":
            validations = [
                body("classroomNo").isInt().notEmpty().withMessage("Classroom number required"),
                body("classroomName").isString().trim().notEmpty().withMessage("Classroom name required."),
                body("classroomFacilitator").isString().notEmpty().withMessage("Class teacher required"),
                body("createdBy").isInt().notEmpty().withMessage("Created by required")
            ]
            break;
        case "complaints":
            validations = [
                body("complainant").isString().notEmpty().withMessage("Complainant required"),
                body("accused").isString().notEmpty().withMessage("Accused required"),
                body("complain").isString().notEmpty().withMessage("Accused required"),
                body("report").isString().notEmpty().withMessage("Accused required"),
                body("handler").isString().notEmpty().withMessage("Accused required"),

            ]
            break;
        case "interviews":
            validations = [
                body("role").isString().notEmpty().withMessage("Role required"),
                body("candidateName").isString().notEmpty().withMessage("Candidate name required"),
                body("phone").isString().notEmpty().withMessage("Phone number required"),
                body("email").isString().notEmpty().withMessage("Email required"),
                body("date").isString().notEmpty().withMessage("Date required"),
            ]
            break;
        case "vacancies":
            validations =[
                body("roleTitle").isString().notEmpty().withMessage("Role required"),
                body("requirements.*.requirement").isString().notEmpty().withMessage("Requirements required"),
                body("qualifications.*.qualification").isString().notEmpty().withMessage("Qualification required"),
                body("salaryRange").isString().notEmpty().withMessage("Salary range required"),
            ]
            break
        case "importantDates":
            validations=[
                body("date").isString().trim().notEmpty().withMessage("Date Required"),
                body("activity").isString().trim().notEmpty().withMessage("Activity Required"),
                body("createdBy").isString().trim().notEmpty().withMessage("Created by required"),
            ]
            break
        case "books":
            validations = [
                body("title").isString().notEmpty().withMessage("Book title required"),
                body("author.*.name").isString().notEmpty().withMessage("Author required"),
                body("publisher.*.name").isString().notEmpty().withMessage("Publisher required"),
                body("category").isString().notEmpty().withMessage("Book category required"),
                body("subcategory").isString().notEmpty().withMessage("Book sub-category required"),
                body("ISBN").isString().notEmpty().withMessage("Book ISBN required"),
                body("publicationDate").isString().notEmpty().withMessage("Publication date required"),
                body("totalCopies").isString().notEmpty().withMessage("Book copies required"),
                body("recordedBy").isInt().notEmpty().withMessage("Recorder required"),
            ]
            break
        case "policies":
            validations = [
                body("policy").isString().notEmpty()
            ]
            break;
        default:
            break;
    }

    return [
        ...validations,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ];
};

module.exports = {validateAndSanitize};

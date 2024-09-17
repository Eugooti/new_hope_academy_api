const crypto = require('crypto');
const IdGenerator = require('../../utils/idGenerator');
const { handleErrors } = require('../../handlers/errorHandlers');

const CreateEmployee = async (model, req, res) => {
    try {
        // Log incoming request body
        const generate = new IdGenerator();
        const { email } = req.body;

        // Validate required fields
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.createHash('sha256').update(email + salt).digest('hex');

        const result = await new model({
            ...req.body,
            employeeNo: generate.generateStaffId(),
            salt,
            password: hashedPassword
        }).save();

        if (!result) {
            return res.status(401).json({
                success: false,
                message: 'Unable to create user'
            });
        }

        return res.status(200).json({
            success: true,
            result:result,
            message: 'User created successfully.'
        });

    } catch (error) {
        // Log the error for debugging
        console.error('Error creating employee:', error);

        // Handle unique constraint error
        if (error.code === 11000) {
            let errorMessage;
            if (error.keyPattern.email) {
                errorMessage = 'Email address already exists';
            } else if (error.keyPattern.phone) {
                errorMessage = 'Phone number already exists';
            } else if (error.keyPattern.idNumber) {
                errorMessage = 'ID number already exists';
            } else if (error.keyPattern.bankAccount) {
                errorMessage = 'Account number already exists';
            } else {
                errorMessage = 'Duplicate key error';
            }

            return res.status(400).json({
                success: false,
                message: errorMessage,
                error: error.message,
            });
        }

        handleErrors(res, error);
    }
};

module.exports = { CreateEmployee };

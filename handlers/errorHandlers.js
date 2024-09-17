const mongoose = require('mongoose');

/*
  Catch Errors Handler
  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

exports.catchErrors = (fn) => {
    return function (req, res, next) {
        const resp = fn(req, res, next);
        if (resp instanceof Promise) {
            return resp.catch(next);
        }
        return resp;
    };
};

exports.handleErrors = (res, error) => {
    console.log(error)
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            result: null,
            message: 'Required fields are not supplied',
            error: error,
        });
    } else {
        return res.status(500).json({
            success: false,
            result: null,
            message: error.message,
            error: error,
        });
    }
};



// Middleware to validate ObjectId
exports.validateObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            success: false,
            message: 'Invalid ID format'
        });
    }
    next();
};

exports.validateLearnerId = (req,res,next)=>{
    const {id} = req.params;
    if (id<1000 || id>9999){
        return res.status(400).json({
            success: false,
            message: "Enter a valid admission number",
            result: null
        })
    }
    next()
}


exports.validateStaffId = (req,res,next)=>{
    const employeeNo = req.params.id

    if (employeeNo<100000 || employeeNo>999999){
        return  res.status(401).json({
            success:false,
            message:"Invalid user id"
        })
    }

    next()
}

exports.itemNotFound = (res,item="Record")=>{
    return res.status(404).json({
        success:false,
        message:`${item} not found`
    })
}

/*
  Not Found Error Handler

  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
exports.notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Url doesn't exist ",
    });
};

/*
  Development Error Handler

  In development, we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
// exports.developmentErrors = (error, req, res, next) => {
//     error.stack = error.stack || '';
//     const errorDetails = {
//         message: error.message,
//         status: error.status,
//         stackHighlighted: error.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
//     };
//
//     res.status(500).json({
//         success: false,
//         message: error.message,
//         error: error,
//     });
// };

/*
  Production Error Handler

  No stacktrace are leaked to admin
*/
exports.productionErrors = (error, req, res, next) => {
    res.status(500).json({
        success: false,
        message: error.message,
        error: error,
    });
};

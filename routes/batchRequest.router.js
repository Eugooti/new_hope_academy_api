const express = require('express');
const {catchErrors} = require("../handlers/errorHandlers");
const {batchRequestsHandler} = require("../handlers/batchRequestsHandler");

const router = express.Router();

router.route('/batch').post(catchErrors(batchRequestsHandler))

module.exports = router;
const express = require('express');

const vendorController = require('../controllers/adminControllers/Finance/vendors.controller');
const budgetController=require('../controllers/adminControllers/Finance/budget.controller');
const feeItemController = require('../controllers/adminControllers/Finance/feeItem.controller');
const feeStructureController = require('../controllers/adminControllers/Finance/feeStructure.controller');
const procurementController = require('../controllers/adminControllers/Finance/procurements.controller');

const {catchErrors, validateObjectId} = require("../handlers/errorHandlers");

const router = express.Router();

router.route('/finance/vendor/create').post(catchErrors(vendorController.createVendor));
router.route('/finance/vendor/read').get(catchErrors(vendorController.readAll));
router.route('/finance/vendor/update/:id').put(validateObjectId,catchErrors(vendorController.update));
router.route('/finance/vendor/delete/:id').delete(validateObjectId,catchErrors(vendorController.remove));

router.route('/finance/procurement/create').post(catchErrors(procurementController.create));
router.route('/finance/procurement/read').post(catchErrors(procurementController.readAll));
router.route('/finance/procurement/update/:id').post(catchErrors(procurementController.update));
router.route('/finance/procurement/delete/:id').post(catchErrors(procurementController.remove));


router.route('/finance/budget/create').post(catchErrors(budgetController.create));
router.route('/finance/budget/read').get(catchErrors(budgetController.readAll));
router.route('/finance/budget/update/:id').put(validateObjectId,catchErrors(budgetController.update));
router.route('/finance/budget/delete/:id').put(validateObjectId,catchErrors(budgetController.remove));

router.route('/finance/feeItem/create').post(catchErrors(feeItemController.create));
router.route('/finance/feeItem/read').get(catchErrors(feeItemController.readAll));
router.route('/finance/feeItem/update/:id').put(validateObjectId,catchErrors(feeItemController.update))
router.route('/finance/feeItem/delete/:id').delete(validateObjectId,catchErrors(feeItemController.remove))

router.route('/finance/feeStructure/create').post(catchErrors(feeStructureController.createFeeStructure));
router.route('/finance/feeStructure/read').get(catchErrors(feeStructureController.readAll));
router.route('/finance/feeStructure/remove/:id').put(validateObjectId,catchErrors(feeStructureController.removeFromFeeStructure));
router.route('/finance/feeStructure/add/:id').put(validateObjectId,catchErrors(feeStructureController.addToFeeStructure));
router.route('/finance/feeStructure/update/:id').put(validateObjectId,catchErrors(feeStructureController.update));
router.route('/finance/feeStructure/delete/:id').delete(validateObjectId,catchErrors(feeStructureController.remove))

module.exports = router;
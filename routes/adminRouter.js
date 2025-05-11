const express = require('express');
const { approvePlanRequest, deletePlanRequest, approveWithdrawRequest, deleteWithdrawRequest } = require('../controllers/adminController');
const router = express.Router();

router.patch('/approve-plan-request', approvePlanRequest);
router.delete('/delete-plan-request', deletePlanRequest);

router.patch('/approve-withdraw-request', approveWithdrawRequest);
router.delete('/delete-withdraw-request', deleteWithdrawRequest);

module.exports = router;
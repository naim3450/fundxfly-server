const express = require('express');
const { approvePlanRequest, deletePlanRequest, approveWithdrawRequest, deleteWithdrawRequest, updateZoonId, getZoonIdAndMessage, createMessage, getMessage } = require('../controllers/adminController');
const router = express.Router();

router.patch('/approve-plan-request', approvePlanRequest);
router.delete('/delete-plan-request', deletePlanRequest);

router.patch('/approve-withdraw-request', approveWithdrawRequest);
router.delete('/delete-withdraw-request', deleteWithdrawRequest);

router.post('/update-zoon-id', updateZoonId);
router.get('/get-zm', getZoonIdAndMessage);

router.post('/create-message', createMessage);
router.get('/get-message', getMessage);

module.exports = router;
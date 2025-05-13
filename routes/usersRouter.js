const express = require('express');
const router = express.Router();
const { getUsers, planRequest, getPlanRequest, withdrawRequest, getWithdrawRequest, updateMyBalance, updateTotalEarnings, updateAddsIndex, refferalLableIncome, } = require('../controllers/userController');

router.get('/', getUsers);

router.post('/plan-request', planRequest); // This will call the planRequest function when a GET request is made to /api/users/plan-request
router.get('/get-plan-request', getPlanRequest); // This will call the planRequest function when a GET request is made to /api/users/plan-request

router.post('/widthraw-request', withdrawRequest);

router.get('/get-widthraw-requests', getWithdrawRequest); // This will call the planRequest function when a GET request is made to /api/users/plan-request

router.patch('/update-my-balance', updateMyBalance); // This will call the planRequest function when a GET request is made to /api/users/plan-request
router.patch('/update-total-earnings', updateTotalEarnings); // This will call the planRequest function when a GET request is made to /api/users/plan-request

router.patch('/update-adds-index', updateAddsIndex);

router.patch('/refferal-lable-income', refferalLableIncome);
module.exports = router;
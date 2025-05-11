const express = require('express');
const { updateIncomeDetails, getIncomeDetails, setAddress, getAddress } = require('../controllers/incomeController');
const router = express.Router();

router.get('/', getIncomeDetails);
router.post('/update', updateIncomeDetails);
router.post('/set-address', setAddress);
router.get('/get-address', getAddress);

module.exports = router;
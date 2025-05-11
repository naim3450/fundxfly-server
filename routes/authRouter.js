const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, } = require('../controllers/authController');

router.post('/register', registerUser); // This will call the createUser function when a GET request is made to /api/users

router.post('/login', loginUser);

router.get('/me', getMe);


module.exports = router;
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, } = require('../controllers/authController');
const { isLoggedin } = require('../middlewares/isLoggedin');

router.post('/register', registerUser); // This will call the createUser function when a GET request is made to /api/users

router.post('/login', loginUser);

router.get('/me', isLoggedin, getMe);


module.exports = router;
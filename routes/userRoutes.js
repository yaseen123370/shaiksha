const express = require('express');
const { registerUser,verifyOtp } = require('../controllers/userController');

const router = express.Router();

// POST request for registering a user
router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);

module.exports = router;

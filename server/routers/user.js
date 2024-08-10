const express = require('express');
const router = express.Router();
const{sendOTP,login,signup} = require('../controllers/auth');

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP) 

// Export the router for use in the main application
module.exports = router;
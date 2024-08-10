const express = require('express');
const router = express.Router();


//import controller
const {getCurrentWeatherData} = require('../controllers/weatherData');
const {auth} = require('../middleware/auth');

//create routes
router.get('/weather/current',auth,getCurrentWeatherData);

module.exports = router;
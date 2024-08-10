const express = require('express');
const router = express.Router();

const {getIrrigationRecommendations,getIrrigationStatus,startIrrigation,stopIrrigation} = require('../controllers/IrrigationSchedulelogic');
const { auth } = require('../middleware/auth');



router.post('/irrigation/start',auth,startIrrigation);
router.post('/irrigation/stop',auth,stopIrrigation);
router.get('/irrigation/status',auth,getIrrigationStatus);
router.get('/recommendations',auth,getIrrigationRecommendations);

module.exports = router;
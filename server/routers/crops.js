const express = require('express');
const router = express.Router();

//get controllers
const{getCropById,getAllCrops,addCrop} = require('../controllers/crops');
const { auth } = require('../middleware/auth');


//get all course
router.get('/getAllcrops',auth,getAllCrops);

//get particular crops by id
router.post('/getcrop/:id',auth,getCropById);

//add crop
router.get('/addcrop',auth,addCrop);

module.exports = router;
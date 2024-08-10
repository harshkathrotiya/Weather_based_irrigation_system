const express = require('express');
const router = express.Router();

//import soil
const{getSoilTypes,getSoilById,addSoil} = require('../controllers/soil');
const { auth } = require('../middleware/auth');


//get soiltypes
router.get('/soil/types',auth,getSoilTypes);
router.get('/addsoil',auth,addSoil);
router.get('/soil/:id',auth,getSoilById);

module.exports = router;
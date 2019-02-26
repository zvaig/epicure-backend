/**
 * This module routes any URL path that starts with: '.../api/v1/dishes'
 */

'use strict';

const express = require('express');
const router = express.Router();

//controllers
const dishController = require('../controllers/dishesController');
const dishValidator = require('../validators/dishValidator')

router.route('/')
    .get(dishController.getDishes)

router.route('/getByRestId')
    .get(dishController.getDishesByRestId)   


module.exports = router;

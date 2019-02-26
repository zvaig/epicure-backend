/**
 * This module routes any URL path that starts with: '.../api/v1/restaurants'
 */

'use strict';

const express = require('express');
const router = express.Router();

//controllers
const restaurantController = require('../controllers/restaurantsController');
const restaurantValidator = require('../validators/restaurantValidator')


router.route('/')
    .get(restaurantController.getRestaurants)

router.route('/getById')
    .get(restaurantController.getRestById) 

router.route('/getFiltered')
    .get(restaurantController.getFilteredRestaurants)

module.exports = router;

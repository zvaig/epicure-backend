/**
 * This module routes any URL path that starts with: '.../api/v1/chefs'
 */

'use strict';

const express = require('express');
const router = express.Router();

//controllers
const chefController = require('../controllers/chefsController');


router.route('/')
    .get(chefController.getChefs)


module.exports = router;

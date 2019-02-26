/**
 * This module routes any URL path that starts with: '.../api/v1/'
 */

const restaurantRoutes = require('./restaurantRoutes');
const dishRoutes = require('./dishRoutes');
const chefRoutes = require('./chefRoutes');
const adminRoutes = require('./adminRoutes');


'use strict';

const express = require('express');
const router = express.Router();

router.use('/restaurants/', restaurantRoutes);
router.use('/dishes/', dishRoutes);
router.use('/chefs/', chefRoutes);
router.use('/admin/', adminRoutes);

module.exports = router;

/**
 * This module routes any URL path that starts with: '.../api/'
 */

'use strict';

const express = require('express');
const router = express.Router();
const v1Routes = require('../v1/routes/v1Routes');

router.use('/v1/', v1Routes);

module.exports = router;

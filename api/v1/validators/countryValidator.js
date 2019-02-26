'use strict';

const { check, validationResult } = require('express-validator/check');

let validatorCallback = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.mapped() });
	}
	return next();
};

exports.createCountry = [
	check('name')
		.trim()
		.not()
		.isEmpty()
		.customSanitizer((value) => {
			return value.toLowerCase();
		}),
	check('flagImageUrl').optional().isURL(),
	validatorCallback
];

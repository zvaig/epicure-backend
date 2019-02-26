'use strict';

const { check, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');

let validatorCallback = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.mapped() });
	}
	return next();
};

exports.createDish = [
	check('name')
		.isString()
		.customSanitizer((value) => {
			return value.toLowerCase();
		}),
	check('restaurant').customSanitizer((value) => {
        return new mongoose.Types.ObjectId(value);
    }),
    check('imgUrl')
        .optional()
        .isURL(),

    check('imgUrlThumbnail')
        .optional()
        .isURL(),

    check('description')
        .isString(),  

    check('price')
        .isNumeric(),

    check('dishType')
        .isString(),

	validatorCallback
];

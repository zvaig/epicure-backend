const dishesHandler = require('../handlers/dishesHandler');

/**
 *  * This module routes any URL path that starts with: '.../api/v1/dishes/'

 * The function creates a new country in the db (if it doesn't exist already).
 *
 * @param {*} req
 * @param {*} res 
 * @param {*} next
 */

function getDishes(req, res, next) {
	const queryParams = req.query; // (if exists) holds any filtering option (E.g limit)
	queryParams.limit = Number.parseInt(queryParams.limit) || 3;

	dishesHandler.getDishes(queryParams, (error, dishes) => {
		if (error) {
			return next(error);
		}
		res.send(dishes);
	});
}

function getDishesByRestId(req, res, next) {
	const queryParams = req.query; // (if exists) holds any filtering option (E.g limit)
	queryParams.limit = Number.parseInt(queryParams.limit) || 6;
	dishesHandler.getDishesByRestId(queryParams, (error, dishes) => {
		if (error) {
			return next(error);
		}
		res.send(dishes);
	});
}

module.exports = {
	getDishes,
	getDishesByRestId,
	
};

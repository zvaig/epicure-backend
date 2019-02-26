const restaurantsHandler = require('../handlers/restaurantsHandler');

/**
 *  * This module routes any URL path that starts with: '.../api/v1/restaurants/'

 * The function creates a new country in the db (if it doesn't exist already).
 *
 * @param {*} req
 * @param {*} res 
 * @param {*} next
 */

function getRestaurants(req, res, next) {
	const queryParams = req.query; // (if exists) holds any filtering option (E.g limit)
	queryParams.limit = Number.parseInt(queryParams.limit) || 20;
	restaurantsHandler.getRestaurants(queryParams, (error, restaurants, count) => {
		if (error) {
			return next(error);
		}
		res.send({restaurants});
	});
}

function getRestById(req, res, next) {
	const queryParams = req.query; // (if exists) holds any filtering option (E.g limit)
	queryParams.limit = Number.parseInt(queryParams.limit) || 6;
	restaurantsHandler.getRestById(queryParams, (error, restaurants) => {
		if (error) {
			return next(error);
		}
		res.send(restaurants);
	});
}

function getFilteredRestaurants(req, res, next) {
	const queryParams = req.query; // (if exists) holds any filtering option (E.g limit)
	queryParams.limit = Number.parseInt(queryParams.limit) || 3;
	restaurantsHandler.getFilteredRestaurants(queryParams, (error, restaurants) => {
		if (error) {
			return next(error);
		}
		res.send(restaurants);
	});
}

module.exports = {
	getRestaurants,
	getRestById,
	getFilteredRestaurants
	
};

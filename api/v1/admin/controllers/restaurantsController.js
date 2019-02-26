const restaurantsHandler = require('../handlers/restaurantsHandler');

/**
 *  * This module routes any URL path that starts with: '.../api/v1/admin/restaurants/'

 * The function creates a new country in the db (if it doesn't exist already).
 *
 * @param {*} req
 * @param {*} res 
 * @param {*} next
 */

function getFilteredList(req, res, next) {
	const queryParams = req.query; // (if exists) holds any filtering option (E.g limit)	
	restaurantsHandler.getFilteredList(queryParams, (error, restaurants) => {
		if (error) {
			return next(error);
		}
		res.send({restaurants});
	});
}

function createRestaurant(req, res, next) {
	restaurantsHandler.createRestaurant(req.body,(error, restaurants) => {
		if (error) {
			return next(error);
		}
		res.send(restaurants);
	});
}

function updateOne(req, res, next) {
	const parameters = {
		query : req.query,
		body : req.body 
	}
	restaurantsHandler.updateOne(parameters, (error, restaurant) => {
		if (error) {
			return next(error);
		}
		res.send({restaurant});
	});
}

function deactivateRestaurant(req, res, next) {
	restaurantsHandler.deactivateRestaurant(req.query,(error, restaurant) => {
		if (error) {
			return next(error);
		}
		res.send(restaurant);
	});
}

module.exports = {
	getFilteredList,
	createRestaurant,
	updateOne,
	deactivateRestaurant	
};
const dishesHandler = require('../handlers/dishesHandler');

/**
 *  * This module routes any URL path that starts with: '.../api/v1/admin/dishes/'

 * The function creates a new country in the db (if it doesn't exist already).
 *
 * @param {*} req
 * @param {*} res 
 * @param {*} next
 */

function getByDishId(req, res, next) {
    const queryParams = req.query; // (if exists) holds any filtering option (E.g limit)
	dishesHandler.getByDishId(queryParams, (error, dishes) => {
        if (error) {
            return next(error);
		}
		res.send(dishes);
	});
}

function getFilteredList(req, res, next) {
	const queryParams = req.query; // (if exists) holds any filtering option (E.g limit)	
	dishesHandler.getFilteredList(queryParams, (error, dishes) => {
		if (error) {
			return next(error);
		}
		res.send({dishes});
	});
}

function createDish(req, res, next) {
	dishesHandler.createDish(req.body,(error, dishes) => {
		if (error) {
			return next(error);
		}
		res.send(dishes);
	});
}

function updateOne(req, res, next) {
	const parameters = {
		body : req.body, 
		query : req.query
	}
	dishesHandler.updateOne(parameters, (error, dish) => {
		if (error) {
			return next(error);
		}
		res.send({dish});
	});
}

function deactivateDish(req, res, next) {
	dishesHandler.deactivateDish(req.query,(error, dishes) => {
		if (error) {
			return next(error);
		}
		res.send(dishes);
	});
}

module.exports = {
    getByDishId,
    getFilteredList,
    createDish,
    updateOne,
    deactivateDish
};

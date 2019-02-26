const chefsHandler = require('../handlers/chefsHandler');

/**
 *  * This module routes any URL path that starts with: '.../api/v1/admin/chefs/'

 * The function creates a new country in the db (if it doesn't exist already).
 *
 * @param {*} req
 * @param {*} res 
 * @param {*} next
 */

function getChefById(req, res, next) {
    const queryParams = req.query; // (if exists) holds any filtering option (E.g limit)
	chefsHandler.getChefById(queryParams, (error, chef) => {
        if (error) {
            return next(error);
		}
		res.send(chef);
	});
}

function getFilteredList(req, res, next) {
	const queryParams = req.query; // (if exists) holds any filtering option (E.g limit)	
	chefsHandler.getFilteredList(queryParams, (error, chefs) => {
		if (error) {
			return next(error);
		}
		res.send({chefs});
	});
}

function createChef(req, res, next) {
	chefsHandler.createChef(req.body,(error, chef) => {
		if (error) {
			return next(error);
		}
		res.send(chef);
	});
}

function updateOne(req, res, next) {
	const parameters = {
		body : req.body, 
		query : req.query
	}
	chefsHandler.updateOne(parameters, (error, chef) => {
		if (error) {
			return next(error);
		}
		res.send({chef});
	});
}

function deactivateChef(req, res, next) {
	chefsHandler.deactivateChef(req.query,(error, chef) => {
		if (error) {
			return next(error);
		}
		res.send(chef);
	});
}

module.exports = {
    getChefById,
    getFilteredList,
    createChef,
    updateOne,
    deactivateChef
};

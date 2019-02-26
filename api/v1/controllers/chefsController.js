const chefsHandler = require('../handlers/chefsHandler');

/**
 *  * This module routes any URL path that starts with: '.../api/v1/chefs/'

 * The function creates a new country in the db (if it doesn't exist already).
 *
 * @param {*} req
 * @param {*} res 
 * @param {*} next
 */

function getChefs(req, res, next) {
    const queryParams = req.query; // (if exists) holds any filtering option (E.g limit)
    queryParams.limit = Number.parseInt(queryParams.limit) || 1;
    
	chefsHandler.getChefs(queryParams, (error, chefs) => {
		if (error) {
			return next(error);
		}
		res.send(chefs);
	});
}


module.exports = {
    getChefs,
    
};

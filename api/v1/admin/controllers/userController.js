const userHandler = require('../handlers/userHandler');
const authHandler = require('../handlers/authHandler');

/**
 *  * This module routes any URL path that starts with: '.../api/v1/admin/user/'

 * The function creates a new country in the db (if it doesn't exist already).
 *
 * @param {*} req
 * @param {*} res 
 * @param {*} next
 */

function checkUserLogin(req, res, next) {
	const bodyParams = req.body; // (if exists) holds any filtering option (E.g limit)	
	// console.log(bodyParams)
	authHandler.loginHelper(bodyParams, (error, user) => {
		if (error) {
			return next(error);
		}
		res.send(user);
	});
}

function registerNewUser(req, res, next) {
	const bodyParams = req.body; //	 (if exists) holds any filtering option (E.g limit)
	authHandler.createNewNormalUser(bodyParams, (error, user) => {
		if (error) {
			return next(error);
		}
		res.send(user);
	});
}

function verifyToken(req, res, next) {
	const token = req.body.token; // (if exists) holds any filtering option (E.g limit)	
	// console.log(req.body)
	authHandler.verifyToken(token, (error, decoded) => {
		if (error) {
			return next(error);
		}
		res.send(decoded);
	});
}

module.exports = {
	checkUserLogin,
	registerNewUser,
	verifyToken
};
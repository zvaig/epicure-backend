/**
 *
 * Welcome to the JWT (Json Web Tokens)
 *
 * In order to use this module you need to accomplish to the following task:
 * 1. npm install jsonwebtoken --save
 * 2. npm install bcryptjs --save
 * 3. create a complex key that should be saved in the config file
 *
 * several notes:
 * 1. When sending the token it should be on the authorization section under the bearer key
 * 2. On your requestController you need to decide which routes will check the token, for instance:
 *
 * let cleanUrl = req.originalUrl.replace(/\//g, '');
 if ((req.method == 'POST' || req.method == 'OPTIONS') &&
 (cleanUrl === 'apiv1user')) {
            return next();
        }else{
            continue to JWT Verification
        }
 3. Once the a user is being verified his token, you should save it to res.locals.userID and check if
 the verified user has the right permissions to do the current query.
 4. if you gets an error from the verified function you should send special error code
 to the client like: res.status(401).json('Failed to authenticate token.');
 */


const jwt = require('jsonwebtoken');
const API_TOKEN_KEY = require('config').get('Security.Request.apiToken');
const ADMIN_TOKEN_KEY = require('config').get('Security.Request.adminToken');
const debug = require('debug');
let log = debug.log;
log = console.log.bind(console);

/**The function creates a jwt without an expiration date and return it
 * @param {Object} data the user you would like to sign in to jwt
 * @param {Number} expirationDuration expiration time in seconds from now
 */
function createTokenWithExpiration(data, expirationDuration, isAdmin) {
	let tokenKey = API_TOKEN_KEY.value;
	if (isAdmin) {
		tokenKey = ADMIN_TOKEN_KEY.value;
	}
	let token = jwt.sign(data, tokenKey, {
		expiresIn: expirationDuration // expires in 24 hours
	});
	return token;
}


/**The function creates a jwt and return it. FOR DEVELOPMENT ONLY.
 *
 * @param {String} userID the user you would like to sign in to jwt
 */
function createTokenWithoutExpiration(userID) {
	let token = jwt.sign({id: userID}, API_TOKEN_KEY.value);
	return token;
}


/**The function receives a key and a token and return an error if the token is invalid and the decoded userID if it's valid
 * @param {String} token the token to verify
 * @param {function(err,decodedID)} cb Callback function
 */
function verifyToken(token, cb, isAdmin) {
	let tokenKey = API_TOKEN_KEY.value;
	if (isAdmin) {
		tokenKey = ADMIN_TOKEN_KEY.value;
	}
	jwt.verify(token, tokenKey, function (err, decodedId) {
		if (err) {
			return cb(err);
		} else {
			log(decodedId);
			return cb(null, decodedId);
		}
	});
}

module.exports = {
	verifyToken,
	createTokenWithExpiration,
	createTokenWithoutExpiration
};

const userModel = require('../../../../db/models/userModel');

/**
 * The function creates a new country in the DB (if it doesn't exist already).
 *
 * @param {*} cb error or the restaurants.
 */

function checkUserLogin(queryParams, cb) {
    let email = queryParams.email;
    let password = queryParams.password;
    userModel.find({'email' : email, 'password': password, 'status': '2'})
		.lean()
		.exec(cb)
}
//////////////////////////////////// remove????????????????????????

module.exports = {
	checkUserLogin,
};

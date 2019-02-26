
const ChefModel = require('../../../db/models/chefModel');
/**
 * The function creates a new country in the DB (if it doesn't exist already).
 *
 * @param {*} cb error or the restaurants.
 */

function getChefs(queryParams, cb) {
	ChefModel.find({"status": "1"})
	.lean()
	.limit(queryParams.limit)
	.exec(cb)	
}


module.exports = {
    getChefs,
    
};

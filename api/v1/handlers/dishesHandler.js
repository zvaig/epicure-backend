
const DishModel = require('../../../db/models/dishModel');
const mongoose = require('mongoose');

/**
 * The function creates a new country in the DB (if it doesn't exist already).
 *
 * @param {*} cb error or the restaurants.
 */
function getDishes(queryParams, cb) {
	DishModel.find({"status": "1"})
	.lean()
	.limit(queryParams.limit)
	.populate('restaurant', 'name')
	.exec(cb)
}

function getDishesByRestId(queryParams, cb) {
	const restId = new mongoose.Types.ObjectId(queryParams.id)
	DishModel.find({'restaurant' : restId, 'dishType': queryParams.dishTime})
		.lean()
		.populate('restaurant', 'name')
		.exec(cb)
}



module.exports = {
	getDishes,
	getDishesByRestId
};

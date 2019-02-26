
const RestaurantModel = require('../../../db/models/restaurantModel');
const mongoose = require('mongoose');

/**
 * The function creates a new country in the DB (if it doesn't exist already).
 *
 * @param {*} cb error or the restaurants.
 */

function getRestaurants(queryParams, cb) {
	RestaurantModel.find({"status": "1"})
		.lean()
		.limit(queryParams.limit)
		.populate('ownerName', 'name')
		.exec((err,docs)=>{
			if(!docs) cb(err)

			RestaurantModel.countDocuments({})
			.then((count) => {
				cb(null,docs,count)
			})
			.catch(console.log)
		});
}

function getRestById(queryParams, cb) {
	const restId = new mongoose.Types.ObjectId(queryParams.id)
	RestaurantModel.find({ _id: restId })
		.lean()
		.populate('ownerName', 'name')
		.exec(cb)
		
}


function getFilteredRestaurants(queryParams, cb) {
	let query = {};
	switch (queryParams.filterType) {
		case 'all':
			break;
		case 'new':
			query = { 'createdDate': { $gte: +queryParams.filterValue } }
			break;
		case 'popular':
			query = { 'popularity': { $gte: +queryParams.filterValue } }
			break;
		case 'open':
			query = { 'times.start': { $lte: +queryParams.filterValue }, 'times.end': { $gte: +queryParams.filterValue } }
			break;
		default:
			break;
	}
	RestaurantModel
		.find(query)
		.lean()
		.limit(queryParams.limit)
		.populate('ownerName', 'name')
		.exec(cb)
}



module.exports = {
	getRestaurants,
	getRestById,
	getFilteredRestaurants,
};

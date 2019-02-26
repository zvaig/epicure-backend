
const RestaurantModel = require('../../../../db/models/restaurantModel');
const mongoose = require('mongoose');

/**
 * The function creates a new country in the DB (if it doesn't exist already).
 *
 * @param {*} cb error or the restaurants.
 */

function getFilteredList(queryParams, cb) {
    let filter = queryParams.filter.toLowerCase().trim().split(' ').map(word => {
		return new RegExp(word, 'i');
    })
    let query = { $or:[{'name':filter}]}
	RestaurantModel.find(query)
		.lean()
		.limit(queryParams.limit)
		.populate('ownerName', 'name')
		.exec((err,docs)=>{
			if(!docs) cb(err)

			RestaurantModel.countDocuments({})
			.then((count) => {
                let pageAmount = count / +queryParams.limit;
				cb(null,docs,pageAmount)
			})
			.catch(console.log)
		});
}

function createRestaurant(restaurant, cb) {
	RestaurantModel.create(restaurant)
   	.then((doc) => cb(null, doc))
		.catch('something went wrong')
}

function updateOne({query, body}, cb) {
	const restId = query.id//new mongoose.Types.ObjectId(query.id)
	RestaurantModel.updateOne({'_id' : restId },body)
		.then((doc) => cb(null, doc))
		.catch('something went wrong')
}

function deactivateRestaurant(params, cb) {
	let restId = new mongoose.Types.ObjectId(params.id)
	RestaurantModel.updateOne({'_id': restId}, { $set: {'status' : '0'}} )
	.exec(cb)
}

module.exports = {
	getFilteredList,
	createRestaurant,
	updateOne,
	deactivateRestaurant
};

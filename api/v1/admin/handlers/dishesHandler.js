
const DishModel = require('../../../../db/models/dishModel');
const mongoose = require('mongoose');

/**
 * The function creates a new country in the DB (if it doesn't exist already).
 *
 * @param {*} cb error or the restaurants.
 */

function getByDishId(queryParams, cb) {
	const dishId = new mongoose.Types.ObjectId(queryParams.id)
	console.log(dishId, "dish id")
	DishModel.find({'_id' : dishId})
		.lean()
		.populate('restaurant', 'name')
		.exec(cb)
}

function getFilteredList(queryParams, cb) {
    let filter = queryParams.filter.toLowerCase().trim().split(' ').map(word => {
		return new RegExp(word, 'i');
    })
  
    let query = { $or:[{'name':filter}]}
	DishModel.find(query)
		.lean()
		.limit(queryParams.limit)
		.populate('restaurant', 'name')
		.exec((err,docs)=>{
			if(!docs) cb(err)

			DishModel.countDocuments({})
			.then((count) => {
                let pageAmount = count / +queryParams.limit;
				cb(null,docs,pageAmount)
			})
			.catch(console.log)
		});
}

function createDish(dish, cb) {
	DishModel.create(dish)
   	.then((doc) => cb(null, doc))
		.catch('something went wrong')
}

function updateOne({query, body}, cb) {
	const dishId = query.id//new mongoose.Types.ObjectId(query.id)
	DishModel.updateOne({'_id' : dishId },body)
		.then((doc) => cb(null, doc))
		.catch('something went wrong')
}

function deactivateDish(params, cb) {
	let dishId = new mongoose.Types.ObjectId(params.id)
	DishModel.updateOne({'_id': dishId}, { $set: {'status' : '0'}} )
	.exec(cb)
}

module.exports = {
	getByDishId,
	getFilteredList,
	createDish,
	updateOne,
	deactivateDish
};

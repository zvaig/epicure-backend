
const ChefModel = require('../../../../db/models/chefModel');
const mongoose = require('mongoose');

/**
 * The function creates a new country in the DB (if it doesn't exist already).
 *
 * @param {*} cb error or the restaurants.
 */

function getChefById(queryParams, cb) {
	const chefId = new mongoose.Types.ObjectId(queryParams.id)
	console.log(chefId, "chef id")
	ChefModel.find({'_id' : chefId})
		.lean()
		.exec(cb)
}

function getFilteredList(queryParams, cb) {
    let filter = queryParams.filter.toLowerCase().trim().split(' ').map(word => {
		return new RegExp(word, 'i');
    })
    let query = { $or:[{'name':filter}]}
	ChefModel.find(query)
		.lean()
		.limit(queryParams.limit)
		.exec((err,docs)=>{
			if(!docs) cb(err)

			ChefModel.countDocuments({})
			.then((count) => {
                let pageAmount = count / +queryParams.limit;
				cb(null,docs,pageAmount)
			})
			.catch(console.log)
		});
}

function createChef(chef, cb) {
	ChefModel.create(chef)
   	.then((doc) => cb(null, doc))
		.catch('something went wrong')
}

function updateOne({query, body}, cb) {
	const chefId = query.id//new mongoose.Types.ObjectId(query.id)
	ChefModel.updateOne({'_id' : chefId },body)
		.then((doc) => cb(null, doc))
		.catch('something went wrong')
}

function deactivateChef(params, cb) {
	let chefId = new mongoose.Types.ObjectId(params.id)
	ChefModel.updateOne({'_id': chefId}, { $set: {'status' : '0'}} )
	.exec(cb)
}

module.exports = {
	getChefById,
	getFilteredList,
	createChef,
	updateOne,
	deactivateChef
};

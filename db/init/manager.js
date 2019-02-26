'use strict';

const debug = require('debug');
const mongoose = require('mongoose');
const async = require('async');
const staticCollections = [];
let error = debug('initManager:error');
let log = debug('initManager:log');


/**
 * Wraps dropCollection function from mongoose (in mongoDB engine).
 * The purpose is to ignore curtain errors that might break the
 * async operation (for example when collection doesn't exist).
 *
 * @param {String} collectionName
 * @param {*} next
 */
function dropWrapper(collectionName, next) {
	mongoose.connection.db.dropCollection(collectionName, function (err, res) {
		if (err) {
			if (err.code != 26) // code 26 is when the collection doesn't exist
			{
				return next(err);
			}
		}
		return next(null, res);
	});
}

function dropCollections(next) {
	async.parallel(
		staticCollections.map(function (collection) {
			return dropWrapper.bind(null, collection);
		}),
		function (err, results) {
			if (err) {
				error('dropCollections msg: ' + err.message);
				return next(err);
			}
			log('dropCollections success');
			next();
		});
}

function buildCollections(next) {
	async.series([

	],
	function (err, results) {
		if (err) {
			error('buildCollections msg: ' + err.message);
			return next(err);
		}
		log('buildCollections success');
		next();
	});
}

function start() {
	async.series(
		{
			dropCollections,
			buildCollections
		},
		function (err, results) {
			if (err) {
				console.log('Error in DB init ');
				return;
			}
			console.log('Successfully built collections');
		});
}

module.exports = {
	start
};

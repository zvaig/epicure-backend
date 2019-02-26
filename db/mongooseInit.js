'use strict';

let debug = require('debug');
let error = debug('mongooseInit:error');
let log = debug('mongooseInit:log');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const manager = require('./init/manager');

const dbConfig = require('config').get('MongoDB.Configurations');

let user = dbConfig.user;
let pass = dbConfig.password;
if (!pass || pass.length <= 0) {
	pass = '';
} else {
	pass = ':' + pass + '@';
}


// connect to db
mongoose.connect('mongodb://' + user + pass + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.database, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	// we're connected!
	log('DB connection success!');
	console.log('DB connection success!');

	manager.start();

});

module.exports = {
};

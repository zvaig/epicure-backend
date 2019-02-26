'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// loading mongo (require module) will initialize the connection.
const mongo = require('./db/mongooseInit');
const apiRoutes = require('./api/routes/apiRoutes');
const fs = require('fs');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express'),
	swaggerDocument = require('./swagger.json');

//http modules
var helmet = require('helmet');	
app.use(helmet.hidePoweredBy({setTo: 'DummyServer'})); //change value of X-Powered-By header to given value
app.use(helmet.noCache({noEtag: true})); //set Cache-Control header
app.use(helmet.noSniff());    // set X-Content-Type-Options header
app.use(helmet.frameguard()); // set X-Frame-Options header
app.use(helmet.xssFilter());  // set X-XSS-Protection header

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' });
app.use(logger('remote-addr - :remote-user [:date[clf]] \
":method :url HTTP/:http-version" :status :res[content-length] \
":referrer" ":user-agent" :response-time ms', {
	stream: accessLogStream,
	skip: function (req, res) {
		return req.url.startsWith('/test');
	}
}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.static(path.join(__dirname, 'public')));

// TODO in production: handpick which cors to allow to prevent a security holes.
app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// this line must be immediately after any of the bodyParser middleware!
app.use(expressValidator());


app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/', express.static(__dirname + '/webApidoc'));
app.use('/api/', apiRoutes);
// app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));

if (process.env.NODE_ENV != 'production') {
	app.use('/api', express.static(__dirname + '/apiweb'));
}


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	if (err) {
		let status = 400;
		if (err.status) {
			status = err.status;
		}
		res.status(status).json({ error: err.message });
	}
});

module.exports = app;

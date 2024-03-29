const path = require('path');
const express = require('express');
const app = express();
const apiV1 = require('./v1/index');
const apiV2 = require('./v2/index');
const { UserError, ErrorMessage } = require('./util/error');
const { errorLog } = require('./util/log');

// api route, all the api will start with /api/v1/xx
app.use('/api/v1', apiV1);
app.use('/api/v2', apiV2);

// error middleware must have four parameter
app.use((err, req, res, next) => {
	if (err instanceof UserError) {
		res.status(err.statusCode).send({ message: err.message });
	} else {
		errorLog(err);
		let message = `${ErrorMessage[500]}`;
		res.status(500).send({ message });
	}
});

// send 404 error if other path
app.use('/*', (req, res) => {
	/**
	 * Can use redirect to redirect somewhere -- res.redirect('http://localhost:3000/')
	 * Can serve html file -- res.sendFile(path.resolve('views/404.html'));
	 */
	res.status(404).send(`${req.method} ${req.originalUrl} endpoint not found`);
});

module.exports = app;

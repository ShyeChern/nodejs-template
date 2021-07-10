const path = require('path');
const apiV1 = require('./v1/index');
// const apiV2 = require('./v2/index');
const { errorLog } = require('./util/log');

module.exports.setRoutes = (app) => {
	// api route, all the api will start with /api/v1/xx
	app.use('/api/v1', apiV1);

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
		 * Can serve html file -- res.sendFile(path.join(__dirname, '../views/404.html'));
		 */
		res.status(404).send(`${req.method} ${req.originalUrl} endpoint not found`);
	});
};

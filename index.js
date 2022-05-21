const path = require('path');
// use .env if there is no NODE_ENV (specify in package.json)
require('dotenv').config({
	path: path.resolve(`.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`),
});
require('./database/sequelize/database').init();
const express = require('express');
const cors = require('cors');
const https = require('https');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const fs = require('fs');
const { setRoutes } = require('./src/routes');
const { cronJob } = require('./src/cron/index');
const PORTs = JSON.parse(process.env.PORTs ?? '[5000, 5001, 5002]');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SIGNAGURE));
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(compression());
// directly access for static file at -- http://localhost:5000/public/static_file.jpg
app.use('/public', express.static(path.resolve('public')));

setRoutes(app);
if (process.env.NODE_ENV === 'production') {
	const options = {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT),
	};

	for (const port of PORTs) {
		https.createServer(options, app).listen(port, () => {
			console.log(`Listening on port ${port}`);
		});
	}

	cronJob();
} else {
	for (const port of PORTs) {
		app.listen(port, () => {
			console.log(`Listening on port ${port}`);
		});
	}
}

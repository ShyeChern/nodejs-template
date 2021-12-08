require('dotenv').config();
const express = require('express');
const cors = require('cors');
const https = require('https');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const fs = require('fs');
const { setRoutes } = require('./src/routes');
const { cronJob } = require('./src/cron/index');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SIGNAGURE));
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(compression());
// directly access for static file at -- http://localhost:5000/public/static_file.jpg
app.use('/public', express.static(path.join(__dirname, 'public')));

setRoutes(app);

if (process.env.NODE_ENV === 'production') {
	const options = {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT),
	};

	https.createServer(options, app).listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});

	cronJob();
} else {
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
}

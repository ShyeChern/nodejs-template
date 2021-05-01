'use strict'

require('dotenv').config();
require('./src/util/appError');
require('./config/constants');
const express = require('express');
const cors = require('cors');
const https = require('https');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');
const { setRoutes } = require('./src/routes');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
}));
app.use(helmet());

setRoutes(app);

if (process.env.NODE_ENV == 'production') {
  const options = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT)
  };
  
  https.createServer(options, app).listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })
} else {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}



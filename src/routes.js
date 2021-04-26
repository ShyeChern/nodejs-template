'use strict';
const apiV1 = require('./v1/index');
// const apiV2 = require('./v2/index');

module.exports.setRoutes = (app) => {
  // api route, all the api will start with /api/v1/xx
  app.use('/api/v1', apiV1);

  // send 404 error if other path
  app.use('/*', (req, res) => {
    res.status(404).send(`${req.method} ${req.originalUrl} endpoint not found`);
  });

  // error middleware
  app.use((err, req, res, next) => {
    let message = err.showErrorCode ? `[${err.errorCode}] ${err.message}` : `${err.message}`;
    res.status(err.statusCode).send({ message })
  });
};
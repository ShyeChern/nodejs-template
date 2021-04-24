'use strict';
const express = require('express');
const router = express.Router();
const userController = require('./users/userController');
const salesController = require('./sales/salesController');

/**
 * Defined route for every function
 * Can put middleware beside the method and also chaining the route with different
 */


// User route
router.route('/users/login').post(userController.login);

router.route('/users').get(userController.add)
  .post(userController.add)
// user upload image upload attachment

// Sales route
router.route('/sales/get-sales/:page').get(salesController.getSales);
// crud 
// join 
router.route('/uploads').post(salesController.uploads);

module.exports = router;
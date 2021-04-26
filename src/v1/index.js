'use strict';
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const userController = require('./users/userController');
const salesController = require('./sales/saleController');
const uploadController = require('./uploads/uploadController');

/**
 * Defined route for every function with middleware
 */
// try see if can group together
// User route
router.route('/users/login').post(userController.login);

router.route('/users').post(userController.add)

router.route('/users/:userId/sales').get(verifyToken, userController.getUserSale)

// Sales route
router.route('/sales').get(verifyToken, salesController.getSale)
  .post(verifyToken, salesController.addSale);
router.route('/sales/:id').put(verifyToken, salesController.updateSale)
  .delete(verifyToken, salesController.deleteSale);

router.route('/uploads').post(salesController.uploads);

// Uploads route
router.route('/view/:folder/:file').get(uploadController.viewFile);
router.route('/download/:folder/:file').get(uploadController.downloadFile);

module.exports = router;
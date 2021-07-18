const express = require('express');
const router = express.Router();
const { verifyAccess } = require('../middleware/middleware');
const userController = require('./users/user.controller');
const salesController = require('./sales/sale.controller');
const uploadController = require('./uploads/upload.controller');

/**
 * Defined route for every function with middleware
 * start with --> /api/v1
 */

// User route
router.route('/users/login').post(userController.login);

router.route('/users').post(userController.add);

router.route('/users/:userId/sales').get(verifyAccess([1, 2]), userController.getUserSale);

// Sales route
router
	.route('/sales')
	.get(verifyAccess([1, 2]), salesController.getSale)
	.post(verifyAccess([1, 2]), salesController.addSale);
router
	.route('/sales/:id')
	.put(verifyAccess([1, 2]), salesController.updateSale)
	.delete(verifyAccess([1, 2]), salesController.deleteSale);

// Uploads route -- No authorization header
router.route('/view/:folder/:file').get(uploadController.viewFile);
router.route('/download/:folder/:file').get(uploadController.downloadFile);
router.route('/uploads/read-excel').post(uploadController.readExcel);
router.route('/uploads/write-excel').get(uploadController.writeExcel);

/**
 * Cookie Sample -- must be under same domain
 * Signed cookie will return false if cookie is modified, undefined if not exist
 * maxAge in milliseconds
 */
router.route('/test-cookie').get((req, res) => {
	console.log(req.signedCookies[APP_COOKIE]);
	res.cookie(APP_COOKIE, 'value', {
		maxAge: 60000,
		httpOnly: true,
		secure: true,
		signed: true,
	});
	res.send('check cookie');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const userController = require('./users/user.controller');
const salesController = require('./sales/sale.controller');
const uploadController = require('./uploads/upload.controller');

/**
 * Defined route for every function with middleware
 */
// try see if can group together
// User route
router.route('/users/login').post(userController.login);

router.route('/users').post(userController.add);

router.route('/users/:userId/sales').get(verifyToken, userController.getUserSale);

// Sales route
router
	.route('/sales')
	.get(verifyToken, salesController.getSale)
	.post(verifyToken, salesController.addSale);
router
	.route('/sales/:id')
	.put(verifyToken, salesController.updateSale)
	.delete(verifyToken, salesController.deleteSale);

// Uploads route -- No authorization header
router.route('/view/:folder/:file').get(uploadController.viewFile);
router.route('/download/:folder/:file').get(uploadController.downloadFile);

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

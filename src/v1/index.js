const express = require('express');
const router = express.Router();
const { verifyAccess } = require('../middleware/middleware');
const userController = require('./users/user.controller');
const salesController = require('./sales/sale.controller');
const uploadController = require('./uploads/upload.controller');
const constants = require('../util/constants');
const { mergeSort, binarySearch } = require('../util/functions');

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
router.route('/cookie').get((req, res) => {
	console.log(req.signedCookies[constants.APP_COOKIE]);
	res.cookie(constants.APP_COOKIE, 'value', {
		maxAge: 60000,
		httpOnly: true,
		secure: true,
		signed: true,
	});
	res.send('check cookie');
});

/**
 * Sample function for merge sort and binary search
 */
router.route('/functions').get((req, res) => {
	const sort = [
		mergeSort([5, 23, 68, 12, 6]), // default sort
		mergeSort(['alex', 'Win', 'Jack', 'bob', 'Ann'], { primer: (a) => a.toLowerCase() }), // sort by string with lowercase
		mergeSort([{ val: 5 }, { val: 1 }, { val: 6 }, { val: 8 }, { val: 2 }], {
			field: 'val',
			isReverse: true,
		}), // sort object with descending
	];
	const search = [
		binarySearch([2, 5, 6, 9, 13, 15, 28, 30], 23),
		binarySearch(
			[{ num: 4 }, { num: 21 }, { num: 22 }, { num: 42 }, { num: 64 }, { num: 88 }],
			88,
			'num'
		),
		binarySearch(
			[{ str: 'a' }, { str: 'b' }, { str: 'c' }, { str: 'd' }, { str: 'e' }, { str: 'f' }],
			'f',
			'str'
		),
	];
	res.send({ sort: sort.flat(), search });
});

module.exports = router;

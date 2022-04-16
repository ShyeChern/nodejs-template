const express = require('express');
const router = express.Router();
const { verifyAccess } = require('../middleware/middleware');
const productController = require('./products/products.controller');
const quotationController = require('./quotations/quotations.controller');

/**
 * Defined route for every function with middleware
 * start with --> /api/v2
 */

// Sales route
router.route('/products').post(verifyAccess([1, 2]), productController.addProduct);

router.route('/products/:id').put(verifyAccess([1, 2]), productController.updateProduct);

router.route('/quotations').get(verifyAccess([1, 2]), quotationController.getQuotation);
router.route('/quotations/:id').delete(verifyAccess([1, 2]), quotationController.deleteQuotation);

module.exports = router;

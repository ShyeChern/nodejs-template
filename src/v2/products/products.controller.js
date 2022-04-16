const { Product } = require('./products.model');
const { UserError } = require('../../util/error');

module.exports.addProduct = async (req, res, next) => {
	try {
		const product = await Product.create({ name: 123 });
		if (product) {
			res.send({ message: 'Add product successfully' });
		}
	} catch (err) {
		return next(err);
	}
};

module.exports.updateProduct = async (req, res, next) => {
	try {
		const product = await Product.update(
			{ name: req.body.name },
			{
				where: {
					id: req.params.id,
				},
			}
		);
		if (product[0] === 0) {
			throw new UserError(UserError.INVALID_PRODUCT_ID);
		}
		res.send({ message: 'Update product successfully' });
	} catch (err) {
		return next(err);
	}
};

const { Quotation } = require('./quotations.model');
const { Product } = require('../products/products.model');
const { UserError } = require('../../util/error');

module.exports.getQuotation = async (req, res, next) => {
	try {
		const quotation = await Quotation.findAll({
			where: { deleted_at: null },
			attributes: ['id', 'price'],
			include: [{ model: Product, attributes: ['id', 'name'], required: true }],
			order: [['id', 'desc']],
			limit: 2,
			offset: 0,
		});
		res.send(quotation);
	} catch (err) {
		return next(err);
	}
};

module.exports.deleteQuotation = async (req, res, next) => {
	try {
		const quotation = await Quotation.destroy({ where: { id: +req.params.id } });
		if (quotation === 0) {
			throw new UserError(UserError.INVALID_QUOTATION_ID);
		}
		res.send({ message: 'Delete quotation successfully' });
	} catch (err) {
		return next(err);
	}
};

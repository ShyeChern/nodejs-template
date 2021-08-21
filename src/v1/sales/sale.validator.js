const Joi = require('joi').extend(require('@joi/date'));
const GeneralModel = require('../../models/generalModel');
const saleGeneralModel = new GeneralModel('sales');
const userGeneralModel = new GeneralModel('users');
const { UserError } = require('../../util/error');

const id = Joi.number()
	.integer()
	.required()
	.external(async (value) => {
		let saleCount = (await saleGeneralModel.count({ id: value }, 'id')).count;
		if (saleCount === '0') {
			throw new UserError(UserError.INVALID_SALE_ID);
		}
	})
	.error(() => {
		throw new UserError(UserError.INVALID_SALE_ID);
	});

const userId = Joi.number()
	.integer()
	.required()
	.external(async (value) => {
		let userCount = (await userGeneralModel.count({ id: value }, 'id')).count;
		if (userCount === '0') {
			throw new UserError(UserError.INVALID_USER_ID);
		}
	})
	.error(() => {
		throw new UserError(UserError.INVALID_USER_ID);
	});

const packageName = Joi.string()
	.valid('Red', 'Yellow', 'Blue')
	.required()
	.error(() => {
		throw new UserError(UserError.INVALID_PACKAGE_NAME);
	});

const quantity = Joi.number()
	.integer()
	.min(1)
	.required()
	.error(() => {
		throw new UserError(UserError.INVALID_PACKAGE_QUANTITY);
	});

const saleDate = Joi.date()
	.format('YYYY-MM-DD')
	.required()
	.error(() => {
		throw new UserError(UserError.INVALID_DATE_FORMAT);
	});

module.exports.validateAddSale = (input) => {
	const schema = Joi.object({ userId, packageName, quantity, saleDate });

	return schema.validateAsync(input);
};

module.exports.validateUpdateSale = (input) => {
	const schema = Joi.object({ id, userId, packageName, quantity, saleDate });

	return schema.validateAsync(input);
};

module.exports.validateDeleteSale = (input) => {
	const schema = Joi.object({ id });

	return schema.validateAsync(input);
};
